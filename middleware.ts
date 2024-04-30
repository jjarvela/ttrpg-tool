import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  apiAuthPrefix,
  serverPublicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  //redirect from /server to /server/explore
  const isServerRedirectPath = nextUrl.pathname === "/server";
  if (isServerRedirectPath)
    return Response.redirect(new URL("/server/explore", nextUrl));

  //allow anyone to access APIAuthRoutes
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isAPIAuthRoute) return;

  //allow anyone to access server explore and search routes
  const isServerPublicRoute = serverPublicRoutes.includes(nextUrl.pathname);

  if (isServerPublicRoute) {
    return;
  }

  const isLoggedIn = !!req.auth;

  const isServerPrivateRoute = nextUrl.pathname.includes("server/");

  //if user tries to access server or invitation without logging in redirect with invitation or server id in query to facilitate post-login redirection
  if (isServerPrivateRoute && !isLoggedIn) {
    if (nextUrl.pathname.includes("join")) {
      const invId = nextUrl.pathname.split("/")[3];
      return Response.redirect(new URL(`/login?inv=${invId}`, nextUrl));
    }

    const srvId = nextUrl.pathname.split("/")[2];
    return Response.redirect(new URL(`/login?srv=${srvId}`, nextUrl));
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    //prevent logged-in users from accessing register and login pages
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    //prevent visitors from accessing pages meant for logged-in users
  } else if (!isLoggedIn)
    return Response.redirect(new URL("/welcome", nextUrl));

  return;
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.

    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
