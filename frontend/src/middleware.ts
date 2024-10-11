import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Parse the "auth-storage" cookie to check for the access token
  const tokenCookie = request.cookies.get("auth-storage");

    console.log("middleware.ts: tokenCookie", tokenCookie);


  // Check if the token exists and parse it if it's not null
  const token = tokenCookie ? JSON.parse(decodeURIComponent(tokenCookie.value)).accessToken : null;

  console.log("middleware.ts: token", token);

  const isAuthPage =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname.startsWith("/signup");

  // If the user is authenticated and trying to access the login or signup page, redirect to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If the user is not authenticated and trying to access a protected page, redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next(); // Allow access to the requested page
}

export const config = {
  matcher: ["/home", "/mentores", "/vagas", "/signup", "/"], // Define the routes where middleware should apply
};
