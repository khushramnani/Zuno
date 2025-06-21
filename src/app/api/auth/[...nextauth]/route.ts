import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../../convex/_generated/dataModel";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      _id?: string;
      token?: number;
    };
  }
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
  async signIn({ user }) {
    const userId = await convex.mutation(api.users.checkOrCreateUser, {
      name: user.name ?? "Unknown",
      email: user.email ?? "no@email.com",
      avatar: user.image ?? "",
      token: Number(process.env.NEXT_PUBLIC_MAX_TOKENS) || 50000, // Default token value
    });
    (user as any).userId = userId;
    (user as any).token = Number(process.env.NEXT_PUBLIC_MAX_TOKENS) || 50000; // Add token to user object

    
    // (user as any).userId = userId;
    // console.log(user);
    
    return true;
  },

  async jwt({ token, user }) {
    if (user && "userId" in user) {
    token.userId = (user as any).userId;
    token.token = (user as any).token;
  }
  // console.log(token);
  
    return token;
  },

  async session({ session, token }) {
    const userId = token.userId as Id<"users"> ;
  let userToken = token.token as number;

  // Fetch from Convex if you want the latest value
  if (userId) {
    try {
      const userData = await convex.query(api.users.getUserById, { userId });
      if (userData && typeof userData.token === 'number') {
        userToken = userData.token;
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
      
    }
  }

    session.user = {
      ...session.user,
      _id: token.userId as string,
      token: userToken, 
    };
    // console.log(session);
    
    return session;
  },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
