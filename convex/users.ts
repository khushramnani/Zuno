// convex/users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const checkOrCreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      return existing._id; // or null, your choice
    }

    const newUser = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      avatar: args.avatar || "",
    });

    return newUser;
  },
});
