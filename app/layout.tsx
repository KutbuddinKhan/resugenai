import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/context/query-provider";

const urbanist = Urbanist({
  subsets: ["latin"]
})
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-open_sans',
})


export const metadata: Metadata = {
  title: "ResuGenie.ai - AI-Powered Resume Builder",
  description: "Effortlessly create professional resumes using AI. Get personalized resume templates and land your dream job with ResuGenie.ai.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`bg-background`, open_sans.variable, urbanist.className)}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="white"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
