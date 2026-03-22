import type { Metadata } from "next";
// If you created the ThemeProvider earlier, keep it.
// If not, you can remove the ThemeProvider tags. I will assume you have it based on our roadmap.
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // <-- ADD THIS IMPORT
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900 overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Wrap the SidebarProvider with the TooltipProvider */}
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 overflow-y-auto w-full">
                <div className="p-2 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                  <SidebarTrigger />
                </div>
                {children}
              </main>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
