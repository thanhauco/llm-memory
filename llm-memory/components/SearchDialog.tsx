"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchResult {
  title: string
  description: string
  href: string
  category: string
}

const searchContent: SearchResult[] = [
  {
    title: "Getting Started with LLM Memory",
    description: "Learn the fundamentals of memory in Large Language Models and why it's crucial",
    href: "/getting-started",
    category: "Beginner"
  },
  {
    title: "What is LLM Memory?",
    description: "Understanding what LLM memory is and why it matters",
    href: "/getting-started",
    category: "Beginner"
  },
  {
    title: "Context Window",
    description: "The maximum number of tokens that a model can process in a single request",
    href: "/getting-started",
    category: "Beginner"
  },
  {
    title: "Core Concepts",
    description: "Deep dive into the fundamental concepts that power LLM memory systems",
    href: "/concepts",
    category: "Beginner to Intermediate"
  },
  {
    title: "Memory Architectures",
    description: "Several architectural patterns for implementing memory in LLM systems",
    href: "/concepts",
    category: "Intermediate"
  },
  {
    title: "Short-term Memory",
    description: "Maintaining a list of messages in the current conversation",
    href: "/concepts",
    category: "Intermediate"
  },
  {
    title: "Long-term Memory",
    description: "Information that persists across sessions, stored in databases",
    href: "/concepts",
    category: "Intermediate"
  },
  {
    title: "Semantic Memory",
    description: "Uses embeddings to store and retrieve information based on semantic similarity",
    href: "/concepts",
    category: "Intermediate"
  },
  {
    title: "Types of LLM Memory",
    description: "Explore different types of memory systems used in LLM applications",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Short-term Memory (Working Memory)",
    description: "Ephemeral, conversation-scoped memory with detailed implementation",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Long-term Memory (Episodic Memory)",
    description: "Persistent, user-scoped memory with episodic event storage",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Episodic Memory Explained",
    description: "Understanding how episodic memory stores specific events with temporal context",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Semantic Memory Implementation",
    description: "Vector-based memory with similarity search and hybrid retrieval",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Memory Type Comparison",
    description: "Comprehensive comparison table of different memory types",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Vector-based Memory Retrieval",
    description: "Implementation of semantic memory using vector embeddings",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "RAG (Retrieval-Augmented Generation)",
    description: "External memory using retrieval-augmented generation",
    href: "/types",
    category: "Intermediate"
  },
  {
    title: "Implementing LLM Memory",
    description: "Practical patterns and implementations for building memory systems",
    href: "/implementations",
    category: "Intermediate"
  },
  {
    title: "Conversation History Manager",
    description: "A simple but effective pattern for managing conversation history",
    href: "/implementations",
    category: "Intermediate"
  },
  {
    title: "Memory Store with Summarization",
    description: "Summarizes old messages to preserve context while staying within token limits",
    href: "/implementations",
    category: "Intermediate"
  },
  {
    title: "Hybrid Memory System",
    description: "Combining multiple memory types for a comprehensive memory system",
    href: "/implementations",
    category: "Intermediate"
  },
  {
    title: "Advanced Topics",
    description: "Expert-level architectures, optimization techniques, and cutting-edge research",
    href: "/advanced",
    category: "Expert"
  },
  {
    title: "Hierarchical Memory System",
    description: "A multi-tier memory system that organizes memories by recency and importance",
    href: "/advanced",
    category: "Expert"
  },
  {
    title: "Graph-based Memory",
    description: "Represent memories as a knowledge graph to enable complex reasoning",
    href: "/advanced",
    category: "Expert"
  },
  {
    title: "Performance Optimization",
    description: "Caching strategies, batch processing, and async memory operations",
    href: "/advanced",
    category: "Expert"
  },
  {
    title: "Scaling Memory Systems",
    description: "Horizontal and vertical scaling techniques for memory systems",
    href: "/advanced",
    category: "Expert"
  },
  {
    title: "Code Examples & Demos",
    description: "Interactive code examples demonstrating various memory implementation patterns",
    href: "/examples",
    category: "Examples"
  },
  {
    title: "Basic Conversation History",
    description: "A basic implementation for maintaining conversation history",
    href: "/examples",
    category: "Examples"
  },
  {
    title: "Vector Memory Store",
    description: "Using embeddings and vector databases for semantic memory retrieval",
    href: "/examples",
    category: "Examples"
  },
  {
    title: "RAG Implementation",
    description: "Implementing RAG to augment LLM responses with external knowledge",
    href: "/examples",
    category: "Examples"
  }
]

export function SearchDialog() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    return searchContent
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8)
  }, [query])

  const handleResultClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery("")
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Search className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-2xl pt-20">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search topics, concepts, implementations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false)
                  setQuery("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {query.trim() && results.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No results found for "{query}"
              </p>
            )}
            {query.trim() && results.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleResultClick(result.href)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {result.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {!query.trim() && (
              <p className="text-center text-muted-foreground py-8">
                Start typing to search...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

