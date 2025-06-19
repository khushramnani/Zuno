import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

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
    });

    
    (user as any).userId = userId;
    // console.log(user);
    
    return true;
  },

  async jwt({ token, user }) {
    if (user && "userId" in user) {
    token.userId = (user as any).userId;
  }
  // console.log(token);
  
    return token;
  },

  async session({ session, token }) {
    session.user = {
      ...session.user,
      _id: token.userId as string,
    };
    // console.log(session);
    
    return session;
  },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
