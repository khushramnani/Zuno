// convex/users.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const checkOrCreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    avatar: v.optional(v.string()),
    token: v.optional(v.number()),
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
      token: Number(process.env.MAX_TOKENS) || 50000,
    });

    return newUser;
  },
});


export const updadteUserToken = mutation({
  args: {
    userId: v.id("users"),
    token: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });

    return result;
  },
});

export const getUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
});