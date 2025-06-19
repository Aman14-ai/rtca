import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";


export const create = mutation({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        // It retrieves the authenticated user's identity (like their ID, email, name, etc.) from the current authentication context (ctx.auth). give email

        if (!identity) {
            throw new ConvexError("Unauthorised access.");
        }

        if (args.email == identity.email) // it means user try to send reauest to ownself
        {
            throw new ConvexError("Can't send a request to yourself.");
        }

        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const receiver = await ctx.db.query("users").withIndex("by_email", q => q.eq("email", args.email)).unique();

        if (!receiver) {
            throw new ConvexError("user not found in this app.");
        }

        // check if request already sent or not
        const requestAlreadySent = await ctx.db.query("requests").withIndex("by_receiver_sender", q => q.eq("receiver", receiver._id).eq("sender", currentUser._id)).unique();
        // target is receiver and sender is current user.


        if (requestAlreadySent) {
            throw new ConvexError("Request Already sent to the user.");
        }

        // check if request already received
        const requestAlreadyReceived = await ctx.db.query("requests").withIndex("by_receiver_sender", q => q.eq("receiver", currentUser._id).eq("sender", receiver._id)).unique();

        // the curent user is receiver and the target user is sender

        if (requestAlreadyReceived) {
            throw new ConvexError("This user has already sent you a request.");
        }

        // check if two users are already a friend

        const friends1 = await ctx.db.query("friends").withIndex("by_user1", q => q.eq("user1", currentUser._id)).collect();

        const friends2 = await ctx.db.query("friends").withIndex("by_user2", q => q.eq("user2", currentUser._id)).collect();

        if (friends1.some((friend) => friend.user2 === receiver._id) || friends2.some((friend) => friend.user1 === receiver._id)) {
            throw new ConvexError("You are already friends with this user.")
        }


        // now create a request
        const request = await ctx.db.insert("requests", {
            receiver: receiver._id,
            sender: currentUser._id
        });

        return request;

    }
});

export const denyRequest = mutation({
    args: {id:v.id("requests")},
    handler: async(ctx:any , args:any) => {
         const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorised access.");
        }

        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const request = await ctx.db.get(args.id);

        if(!request || request.receiver != currentUser._id)
        {
            throw new ConvexError("Error while processign deny requests.");
        }

        await ctx.db.delete(request._id);

    }
})

export const acceptRequest = mutation({
    args: {
        id: v.id("requests")
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Unauthorised access.");
        }
        const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

        if (!currentUser) {
            throw new ConvexError("User not found.");
        }

        const request = await ctx.db.get(args.id);
        if(!request || request.receiver != currentUser._id)
        {
            throw new ConvexError("An error while accepting request.");
        }

        const conversationId = await ctx.db.insert("conversations" , {isGroup:false});

        await ctx.db.insert("friends" , {
            user1: currentUser._id,
            user2: request.sender,
            conversationId
        })

        await ctx.db.insert("conversationMembers" , {
            userId: currentUser._id,
            conversationId 
        })
        await ctx.db.insert("conversationMembers" , {
            userId: request.sender,
            conversationId 
        })
        await ctx.db.delete(request._id);
    }
})