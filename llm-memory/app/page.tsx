import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, Layers, Code, Rocket, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-6 py-12">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Educational Resource
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Learn Everything About
            <span className="block text-primary mt-2">LLM Memory</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive guide to understanding and implementing memory systems in Large Language Models.
            From beginner concepts to expert-level architectures.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/getting-started">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/examples">View Examples</Link>
          </Button>
        </div>
      </section>

      {/* Learning Path */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Learning Path</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant="outline">Beginner</Badge>
              </div>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Learn the fundamentals of LLM memory, why it matters, and basic concepts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/getting-started">Start Learning</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-5 w-5 text-primary" />
                <Badge variant="outline">Intermediate</Badge>
              </div>
              <CardTitle>Types & Implementations</CardTitle>
              <CardDescription>
                Explore different memory types and learn how to implement memory systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/types">Explore</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-primary" />
                <Badge variant="outline">Expert</Badge>
              </div>
              <CardTitle>Advanced Topics</CardTitle>
              <CardDescription>
                Dive into advanced architectures, optimization, and scaling techniques.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/advanced">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Explore Topics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <CardTitle>Core Concepts</CardTitle>
              </div>
              <CardDescription>
                Understand the fundamental concepts behind LLM memory systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost">
                <Link href="/concepts">Learn Concepts →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Examples & Demos</CardTitle>
              </div>
              <CardDescription>
                Interactive code examples and demonstrations of memory implementations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost">
                <Link href="/examples">View Examples →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
