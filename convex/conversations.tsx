import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Unauthorised access.");
        }

        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const conversationMembership = await ctx.db.query("conversationMembers").withIndex("by_userId", q => q.eq("userId", currentUser._id)).collect()

        const conversations = await Promise.all(conversationMembership?.map(async (membership) => {
            const conversation = await ctx.db.get(membership.conversationId);
            if (!conversation) {
                throw new ConvexError("Conversation not found.");
            }
            return conversation
        }));

        const convesationWithDetails = await Promise.all(conversations.map(async (conversation, index) => {
            const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", q => q.eq("conversationId", conversation?._id)).collect();

            if (conversation.isGroup) 
            {
                return { conversation }
            }
            else
            {
                const otherMembership = allConversationMemberships.filter((membership) => membership.userId != currentUser._id)[0];

                const otherMember = await ctx.db.get(otherMembership.userId);
                return { conversation, otherMember }
            }

        }))

        return convesationWithDetails;


    },
})