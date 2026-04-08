import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/CodeBlock"
import { Diagram } from "@/components/Diagram"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

export default function Concepts() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Beginner to Intermediate</Badge>
        <h1 className="text-4xl font-bold text-foreground">Core Concepts</h1>
        <p className="text-xl text-muted-foreground">
          Deep dive into the fundamental concepts that power LLM memory systems.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Architectures</h2>
        <p className="text-lg text-foreground">
          There are several architectural patterns for implementing memory in LLM systems:
        </p>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Short-term Memory (Conversation History)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                This is the most basic form of memory - maintaining a list of messages in the current conversation.
                It's included directly in the context window of each API call.
              </p>
              <Diagram
                chart={`sequenceDiagram
    participant User
    participant App
    participant LLM
    
    User->>App: Send message
    App->>App: Load conversation history
    App->>LLM: Send history + new message
    LLM->>App: Generate response
    App->>App: Save updated history
    App->>User: Return response`}
                title="Short-term Memory Flow"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Long-term Memory (Persistent Storage)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Information that persists across sessions, stored in databases or vector stores. This includes
                user preferences, facts, and past conversations.
              </p>
              <CodeBlock
                code={`// Long-term memory example
interface LongTermMemory {
  userId: string;
  preferences: UserPreferences;
  facts: Fact[];
  pastConversations: Conversation[];
}

async function retrieveMemory(userId: string): Promise<LongTermMemory> {
  // Load from database
  const memory = await db.memory.findUnique({
    where: { userId }
  });
  return memory;
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Semantic Memory (Vector Search)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Uses embeddings to store and retrieve information based on semantic similarity. This allows
                finding relevant information even when exact keywords don't match.
              </p>
              <CodeBlock
                code={`// Semantic memory with vector search
async function findRelevantMemory(query: string) {
  // Convert query to embedding
  const queryEmbedding = await getEmbedding(query);
  
  // Search for similar embeddings
  const results = await vectorStore.similaritySearch(
    queryEmbedding,
    { topK: 5 }
  );
  
  return results;
}`}
                language="typescript"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Retrieval Strategies</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recency-based Retrieval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Prioritize recent information. Most recent messages are most likely to be relevant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relevance-based Retrieval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Use semantic search to find the most relevant past information based on the current query.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hybrid Retrieval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                Combine multiple strategies - use recency for recent context and semantic search for
                long-term memory.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Context Window Management</h2>
        <p className="text-lg text-foreground">
          Since context windows are limited, you need strategies to manage what goes into each request:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
          <li><strong>Truncation:</strong> Keep only the most recent N messages</li>
          <li><strong>Summarization:</strong> Summarize older messages to preserve key information</li>
          <li><strong>Selective Inclusion:</strong> Only include relevant past messages based on current query</li>
          <li><strong>Sliding Window:</strong> Maintain a fixed-size window that slides as conversation progresses</li>
        </ul>
        <CodeBlock
          code={`// Context window management example
function manageContext(
  messages: Message[],
  maxTokens: number
): Message[] {
  // Strategy 1: Keep most recent messages
  if (getTokenCount(messages) <= maxTokens) {
    return messages;
  }
  
  // Strategy 2: Summarize old messages
  const recentMessages = messages.slice(-10);
  const oldMessages = messages.slice(0, -10);
  const summary = await summarizeMessages(oldMessages);
  
  return [
    { role: "system", content: \`Previous context: \${summary}\` },
    ...recentMessages
  ];
}`}
          language="typescript"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Compression</h2>
        <p className="text-lg text-foreground">
          Techniques to reduce memory footprint while preserving important information:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Summarization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use LLMs to create concise summaries of long conversations or documents.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Extract only key facts, entities, and relationships instead of storing full text.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Next Steps</h2>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/getting-started">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Getting Started
            </Link>
          </Button>
          <Button asChild>
            <Link href="/types">
              Explore Memory Types
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

