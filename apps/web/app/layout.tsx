// apps/web/app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanjeevani - Emergency Response System",
  description: "Mission-critical health assistance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-background text-foreground font-sans antialiased overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <SidebarProvider className="h-full items-stretch">
              <AppSidebar />
              {/* main is now explicitly 100vh and handles the scroll */}
              <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="flex h-14 shrink-0 items-center border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger />
                  <div className="ml-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      System Online // Node-01
                    </span>
                  </div>
                </header>
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
              </main>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
