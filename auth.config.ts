import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      // Dashboard schützen
      if (isOnDashboard) {
        return isLoggedIn;
      }

      // Bereits eingeloggte User nicht auf Login lassen
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;