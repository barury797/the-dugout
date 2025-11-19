import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  // Public POST endpoints that don't require authentication
  const publicPostEndpoints: string[] = [
    '/api/auth/login',
    '/api/auth/logout',
    // '/api/webhooks/stripe',
    // '/api/contact',
  ];

  // Protected paths that require authentication
  const protectedPaths = [
    '/admin',
    '/dashboard',
    // Add other protected paths here
  ];

  // Check if current path is a public endpoint
  const isPublicEndpoint = publicPostEndpoints.includes(request.nextUrl.pathname);
  
  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // Block POST requests for unauthenticated users (except public endpoints)
  if (request.method === "POST" && !user && !isPublicEndpoint) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}