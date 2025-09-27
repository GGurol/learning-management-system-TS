import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a pass-through middleware. It does nothing and allows all requests to proceed.
// Route protection is now handled on the client-side in your (dashboard)/layout.tsx file.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Optionally, you can remove the matcher to have the middleware run on all routes
// or keep it to maintain the same scope. For simplicity, we'll keep it.
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};