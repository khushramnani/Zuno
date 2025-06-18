
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { use } from "react";

export default defineSchema({
     
    users:defineTable({
        name:v.string(),
        email:v.string(),
        avatar:v.string(),
        // id:v.string(),
    })
})