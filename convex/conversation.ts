import { ConvexError, v } from "convex/values";
import { getUserByClerkId } from "./_utils";
import { query } from "./_generated/server";

export const get = query({
    args: {
        id: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorised access.");
        }

        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const conversations = await ctx.db.get(args.id);

        if (!conversations) {
            throw new ConvexError("Conversation not found.");
        }

        const membership = await ctx.db.query("conversationMembers").withIndex("by_userId_conversationId", q => q.eq("userId", currentUser._id).eq("conversationId", conversations._id)).unique();

        if (!membership) {
            throw new ConvexError("You are not a member of this conversation.");
        }

        const allOtherMembership = await ctx.db.query("conversationMembers").withIndex("by_conversationId" , q => q.eq("conversationId" , args.id)).collect();


        if(!conversations.isGroup)
        {
            const otherMembership = allOtherMembership.filter((membership) => 
                membership.userId != currentUser._id
            )[0];

            const otherMemberDetail = await ctx.db.get(otherMembership.userId);

            return {
                ...conversations , 
                otherMember: {
                    ...otherMemberDetail,
                    lastSeenMessageId :otherMembership.lastSeenMessage,
                }, 
                otherMembers:null
            }
        }

    }
});
