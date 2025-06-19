import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";


export const get = query({
    args:{
        id:v.id("conversations")
    },
    handler: async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorised access.");
        }
        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });
        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const messages = await ctx.db.query("messages").withIndex("by_conversationId" , q => q.eq("conversationId" , args.id)).order("desc").collect();

        const messagesWithUsers = Promise.all(
            messages.map(async(msg) => {
                const messageSender  = await ctx.db.get(msg.senderId);
                if(!messageSender)
                {
                    throw new ConvexError("Sender user not found.");
                }
                
                return {
                    msg , senderImage:messageSender.imageUrl , senderName : messageSender.username , isCurrentUser: messageSender._id == currentUser._id
                }
            })
        )
        return messagesWithUsers
       
    }
})