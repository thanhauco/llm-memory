import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LLM Memory - Learn Everything About LLM Memory",
  description: "A comprehensive guide to LLM memory from beginner to expert level",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <div className="hidden md:flex md:w-64 md:flex-shrink-0">
              <Navigation />
            </div>
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
