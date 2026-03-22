import type { Metadata } from "next";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground font-sans selection:bg-red-100 selection:text-red-900">
        {children}
      </body>
    </html>
  );
}
