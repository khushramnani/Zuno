import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createWorkSpace = mutation({
    args:{
        messages: v.any(),
        filedata: v.optional(v.any()),
        user: v.id("users")
    },
    handler: async(ctx, args) => {
        const { messages, filedata, user } = args;
        
        const workspace = await ctx.db.insert("workSpaces", {
            messages,
            filedata,
            user,
        });
        return workspace;
    }
})


export const getWorkSpace = query({
    args: {
        workspaceId: v.id("workSpaces")
    },
    handler: async (ctx, args) => {
        const { workspaceId } = args;

        const workspace = await ctx.db.get(workspaceId);
        return workspace;
    }
})

export const updateMessages = mutation({
    args: {
        workspaceId: v.id("workSpaces"),
        messages: v.any()
    },
    handler: async (ctx, args) => {
        const { workspaceId, messages } = args;

        const updatedWorkspace = await ctx.db.patch(workspaceId, {
            messages
        });

        return updatedWorkspace;
    }
})


export const updateFileData = mutation({
    args: {
        workspaceId: v.id("workSpaces"),
        filedata: v.any()
    },
    handler: async (ctx, args) => {
        const { workspaceId, filedata } = args;

        const updatedWorkspace = await ctx.db.patch(workspaceId, {
            filedata
        });

        return updatedWorkspace;
    }
})

export const getWorkSpacesHistory = query({
    args:{
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        const { userId } = args;

        const workspaces = await ctx.db.query("workSpaces")
            .filter(q=> q.eq(q.field("user"), userId))
            .collect();

        return workspaces;
    }
})

export const deleteWorkSpace = mutation({
    args: {
        workspaceId: v.id("workSpaces")
    },
    handler: async (ctx, args) => {
        const { workspaceId } = args;

        await ctx.db.delete(workspaceId);
        return true; 
    }
})