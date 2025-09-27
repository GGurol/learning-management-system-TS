"use client";
import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/state/redux"; // Import our Redux selector
import { usePathname, useRouter } from "next/navigation"; // Import useRouter for redirection
import { useEffect, useState } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | null>(null);

  // --- CORRECTED: Use Redux state instead of Clerk's useUser hook ---
  const { user, isLoading } = useAppSelector((state) => state.auth);
  
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  // --- CORRECTED: Route protection using Redux state ---
  useEffect(() => {
    // If the auth state is done loading and there is no user, redirect to signin page.
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [isLoading, user, router]);

  // Show a loading screen while we verify the user's login status or if they are being redirected.
  if (isLoading || !user) {
    return <Loading />;
  }
  
  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          {courseId && <ChaptersSidebar />}
          <div
            className={cn(
              "dashboard__main",
              isCoursePage && "dashboard__main--not-course"
            )}
            style={{ height: "100vh" }}
          >
            <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}