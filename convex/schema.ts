import {defineSchema , defineTable} from 'convex/server'
import {v} from 'convex/values'

export default defineSchema({
    users:defineTable({
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),
    }).index("by_email", ["email"]).index("by_clerkId", ["clerkId"]),

    requests: defineTable({
        receiver:v.id("users"),
        sender:v.id("users"),
    }).index("by_receiver",["receiver"]).index("by_receiver_sender",["receiver" , "sender"]),

    friends: defineTable({
        user1: v.id("users"),
        user2: v.id("users"),
        conversationId: v.id("conversations")

    }).index("by_user1" , ["user1"]).index("by_user2" , ["user2"]).index("by_conversationId" , ["conversationId"]),

    conversations: defineTable({
        name:v.optional(v.string()),
        isGroup:v.optional(v.boolean()),
        lastMessageId: v.optional(v.id("messages")),
    }),

    conversationMembers: defineTable({
        userId: v.id("users"),
        conversationId: v.id("conversations"),
        lastSeenMessage: v.optional(v.id("messages")),
    }).index("by_userId" , ["userId"]).index("by_conversationId" , ["conversationId"]).index("by_userId_conversationId" , ["userId" , "conversationId"]),

    messages:defineTable({
        type:v.string(),
        content: v.array(v.string()),
        senderId: v.id("users"),
        conversationId: v.id("conversations"),
    }).index("by_conversationId" , ["conversationId"])

});

// now there should be a file user.ts in which we can perform operations on user