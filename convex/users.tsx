import { query } from "./_generated/server";

export const getAll = query({
    args: {}, // No arguments needed
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    }
})