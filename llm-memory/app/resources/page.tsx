import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Book, Code, Video, FileText } from "lucide-react"

export default function Resources() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Resources</Badge>
        <h1 className="text-4xl font-bold text-foreground">Additional Learning Resources</h1>
        <p className="text-xl text-muted-foreground">
          Curated resources to deepen your understanding of LLM memory systems.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Documentation & Guides</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <CardTitle>LangChain Memory</CardTitle>
              </div>
              <CardDescription>
                Official LangChain documentation on memory management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://python.langchain.com/docs/modules/memory/" target="_blank">
                  Visit Docs <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>OpenAI Best Practices</CardTitle>
              </div>
              <CardDescription>
                OpenAI's guide on managing conversation context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://platform.openai.com/docs/guides/gpt-best-practices" target="_blank">
                  Visit Guide <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>RAG Papers</CardTitle>
              </div>
              <CardDescription>
                Research papers on Retrieval-Augmented Generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://arxiv.org/abs/2005.11401" target="_blank">
                  Read Paper <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <CardTitle>Vector Databases Guide</CardTitle>
              </div>
              <CardDescription>
                Comprehensive guide to vector databases for semantic search
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.pinecone.io/learn/vector-database/" target="_blank">
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Libraries & Tools</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>LangChain</CardTitle>
              <CardDescription>
                Framework for building LLM applications with memory support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Use cases:</strong> Memory management, RAG, agent systems
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://github.com/langchain-ai/langchain" target="_blank">
                    GitHub <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LlamaIndex</CardTitle>
              <CardDescription>
                Data framework for LLM applications with advanced memory capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Use cases:</strong> Document indexing, memory persistence, knowledge graphs
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://github.com/run-llama/llama_index" target="_blank">
                    GitHub <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pinecone</CardTitle>
              <CardDescription>
                Managed vector database for semantic search and memory storage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Use cases:</strong> Semantic memory, RAG, similarity search
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://www.pinecone.io/" target="_blank">
                    Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weaviate</CardTitle>
              <CardDescription>
                Open-source vector database with graph capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Use cases:</strong> Vector search, graph memory, hybrid search
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://weaviate.io/" target="_blank">
                    Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Video Tutorials</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <CardTitle>LangChain Memory Tutorial</CardTitle>
              </div>
              <CardDescription>
                Comprehensive tutorial on implementing memory in LangChain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.youtube.com/results?search_query=langchain+memory" target="_blank">
                  Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <CardTitle>RAG Implementation Guide</CardTitle>
              </div>
              <CardDescription>
                Step-by-step guide to building RAG systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.youtube.com/results?search_query=rag+retrieval+augmented+generation" target="_blank">
                  Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Research Papers</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</CardTitle>
              <CardDescription>
                Lewis et al., NeurIPS 2020 - The original RAG paper
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="https://arxiv.org/abs/2005.11401" target="_blank">
                  Read Paper <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-Context Learning and Induction Heads</CardTitle>
              <CardDescription>
                Research on how LLMs use context for learning and memory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href="https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html" target="_blank">
                  Read Article <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Community & Forums</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>LangChain Discord</CardTitle>
              <CardDescription>
                Active community for LangChain and memory-related discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://discord.gg/langchain" target="_blank">
                  Join Discord <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>r/LangChain Subreddit</CardTitle>
              <CardDescription>
                Reddit community for LangChain discussions and questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://www.reddit.com/r/LangChain/" target="_blank">
                  Visit Subreddit <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Additional Reading</h2>
        <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
          <li>
            <Link href="https://www.anthropic.com/research" className="text-primary hover:underline" target="_blank">
              Anthropic Research - Context window and memory research
            </Link>
          </li>
          <li>
            <Link href="https://openai.com/research" className="text-primary hover:underline" target="_blank">
              OpenAI Research - Latest findings on LLM capabilities
            </Link>
          </li>
          <li>
            <Link href="https://www.deeplearning.ai/" className="text-primary hover:underline" target="_blank">
              DeepLearning.AI - Courses on LLM applications
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

