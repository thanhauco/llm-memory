"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Home, BookOpen, Lightbulb, Layers, Code, Rocket, FileText, Menu, X, Network } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/SearchDialog"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Getting Started", href: "/getting-started", icon: BookOpen },
  { name: "Concepts", href: "/concepts", icon: Lightbulb },
  { name: "Types", href: "/types", icon: Layers },
  { name: "Implementations", href: "/implementations", icon: Code },
  { name: "Advanced", href: "/advanced", icon: Rocket },
  { name: "Examples", href: "/examples", icon: Code },
  { name: "Blockchain Demo", href: "/blockchain", icon: Network },
  { name: "Resources", href: "/resources", icon: FileText },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col h-full p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">LLM Memory</h1>
              <p className="text-sm text-muted-foreground mt-1">Learn everything about LLM memory</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex gap-2">
                <SearchDialog />
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop navigation */}
      <nav className="hidden md:flex flex-col h-full border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">LLM Memory</h1>
          <p className="text-sm text-muted-foreground mt-1">Learn everything about LLM memory</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="p-4 border-t border-border space-y-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </nav>
    </>
  )
}
