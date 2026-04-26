import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/CodeBlock"
import { Diagram } from "@/components/Diagram"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

export default function Implementations() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Intermediate</Badge>
        <h1 className="text-4xl font-bold text-foreground">Implementing LLM Memory</h1>
        <p className="text-xl text-muted-foreground">
          Practical patterns and implementations for building memory systems in LLM applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Implementation Patterns</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pattern 1: Conversation History Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                A simple but effective pattern for managing conversation history with token limits.
              </p>
              <CodeBlock
                code={`class ConversationHistoryManager {
  private messages: Array<{ role: string; content: string }> = [];
  private maxTokens: number;
  
  constructor(maxTokens: number = 4000) {
    this.maxTokens = maxTokens;
  }
  
  addMessage(role: string, content: string) {
    this.messages.push({ role, content });
    this.trimToFit();
  }
  
  private trimToFit() {
    let totalTokens = this.estimateTokens(this.messages);
    
    // Keep system message if present
    const systemMessage = this.messages.find(m => m.role === "system");
    const otherMessages = this.messages.filter(m => m.role !== "system");
    
    // Remove oldest messages until we fit
    while (totalTokens > this.maxTokens && otherMessages.length > 1) {
      otherMessages.shift();
      totalTokens = this.estimateTokens([
        ...(systemMessage ? [systemMessage] : []),
        ...otherMessages
      ]);
    }
    
    this.messages = [
      ...(systemMessage ? [systemMessage] : []),
      ...otherMessages
    ];
  }
  
  private estimateTokens(messages: any[]): number {
    // Rough estimation: 1 token ≈ 4 characters
    return messages.reduce((sum, msg) => 
      sum + Math.ceil(msg.content.length / 4), 0
    );
  }
  
  getMessages() {
    return [...this.messages];
  }
  
  clear() {
    this.messages = [];
  }
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern 2: Memory Store with Summarization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                A more sophisticated pattern that summarizes old messages to preserve context while staying
                within token limits.
              </p>
              <CodeBlock
                code={`class SummarizingMemoryStore {
  private recentMessages: Message[] = [];
  private summary: string = "";
  private maxRecentMessages: number = 10;
  
  async addMessage(message: Message) {
    this.recentMessages.push(message);
    
    if (this.recentMessages.length > this.maxRecentMessages) {
      await this.summarizeOldMessages();
    }
  }
  
  private async summarizeOldMessages() {
    const toSummarize = this.recentMessages.slice(0, -this.maxRecentMessages);
    const remaining = this.recentMessages.slice(-this.maxRecentMessages);
    
    const summaryPrompt = \`Summarize the following conversation, preserving key facts, decisions, and context:
    
\${toSummarize.map(m => \`\${m.role}: \${m.content}\`).join("\\n")}\`;
    
    const newSummary = await this.llm.generate(summaryPrompt);
    this.summary = this.summary 
      ? \`\${this.summary}\\n\\n\${newSummary}\`
      : newSummary;
    
    this.recentMessages = remaining;
  }
  
  getContext(): Message[] {
    return [
      ...(this.summary ? [{
        role: "system",
        content: \`Previous conversation summary: \${this.summary}\`
      }] : []),
      ...this.recentMessages
    ];
  }
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern 3: Vector-based Memory Retrieval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Implementation of semantic memory using vector embeddings and similarity search.
              </p>
              <CodeBlock
                code={`import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "langchain/vectorstores/chroma";

class VectorMemoryStore {
  private vectorStore: Chroma;
  private embeddings: OpenAIEmbeddings;
  
  constructor() {
    this.embeddings = new OpenAIEmbeddings();
    this.vectorStore = new Chroma(this.embeddings, {
      collectionName: "memories"
    });
  }
  
  async storeMemory(
    content: string,
    metadata: {
      userId: string;
      timestamp: Date;
      type: string;
    }
  ) {
    await this.vectorStore.addDocuments([{
      pageContent: content,
      metadata
    }]);
  }
  
  async retrieveRelevantMemories(
    query: string,
    userId: string,
    topK: number = 5
  ) {
    const results = await this.vectorStore.similaritySearchWithScore(
      query,
      topK,
      { userId }
    );
    
    return results.map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
      relevanceScore: score
    }));
  }
  
  async getContextForQuery(
    query: string,
    userId: string
  ): Promise<string> {
    const memories = await this.retrieveRelevantMemories(query, userId);
    
    return memories
      .map((m, i) => \`Memory \${i + 1}: \${m.content}\`)
      .join("\\n\\n");
  }
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern 4: Hybrid Memory System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Combining multiple memory types for a comprehensive memory system.
              </p>
              <Diagram
                chart={`flowchart TD
    A[User Query] --> B[Short-term Memory]
    B --> C{Need More Context?}
    C -->|Yes| D[Query Vector Store]
    C -->|No| E[Build Context]
    D --> F[Retrieve Relevant Memories]
    F --> E
    E --> G[Query Long-term DB]
    G --> H[Get User Preferences]
    H --> I[Combine All Context]
    I --> J[LLM Generation]
    J --> K[Response]
    
    K --> L[Update Short-term]
    K --> M[Store in Vector Store]
    K --> N[Update Long-term DB]`}
                title="Hybrid Memory System Flow"
              />
              <CodeBlock
                code={`class HybridMemorySystem {
  private shortTerm: ConversationHistoryManager;
  private vectorStore: VectorMemoryStore;
  private longTermDB: Database;
  
  async processQuery(userId: string, query: string) {
    // 1. Get short-term context
    const shortTermContext = this.shortTerm.getMessages();
    
    // 2. Retrieve relevant long-term memories
    const relevantMemories = await this.vectorStore
      .retrieveRelevantMemories(query, userId);
    
    // 3. Get user preferences
    const preferences = await this.longTermDB
      .getUserPreferences(userId);
    
    // 4. Build comprehensive context
    const context = this.buildContext({
      shortTerm: shortTermContext,
      longTerm: relevantMemories,
      preferences
    });
    
    // 5. Generate response
    const response = await this.llm.generate(context);
    
    // 6. Update all memory stores
    this.shortTerm.addMessage("user", query);
    this.shortTerm.addMessage("assistant", response);
    
    await this.vectorStore.storeMemory(query, {
      userId,
      timestamp: new Date(),
      type: "user_query"
    });
    
    await this.vectorStore.storeMemory(response, {
      userId,
      timestamp: new Date(),
      type: "assistant_response"
    });
    
    return response;
  }
  
  private buildContext(context: any): string {
    return \`User Preferences:
\${JSON.stringify(context.preferences, null, 2)}

Relevant Past Memories:
\${context.longTerm.map(m => m.content).join("\\n")}

Current Conversation:
\${context.shortTerm.map(m => \`\${m.role}: \${m.content}\`).join("\\n")}\`;
  }
}`}
                language="typescript"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Best Practices</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Token Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Always track token usage to avoid exceeding limits</li>
                <li>Reserve tokens for system prompts and responses</li>
                <li>Implement graceful degradation when limits are reached</li>
                <li>Use token counting libraries for accuracy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Memory Retrieval</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Retrieve only relevant memories to save tokens</li>
                <li>Use semantic search for better relevance</li>
                <li>Implement caching for frequently accessed memories</li>
                <li>Set appropriate top-K values for retrieval</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Memory Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Store memories with rich metadata for filtering</li>
                <li>Implement TTL (time-to-live) for temporary memories</li>
                <li>Use appropriate storage backends (SQL, NoSQL, Vector DB)</li>
                <li>Consider data privacy and compliance requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Handle memory retrieval failures gracefully</li>
                <li>Fall back to simpler memory when advanced systems fail</li>
                <li>Log memory operations for debugging</li>
                <li>Implement retry logic for external memory stores</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Common Pitfalls</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Token Overflow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Including too much context can cause errors or poor performance. Always implement
                token management strategies.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stale Memories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Old memories can become irrelevant. Implement memory expiration and update strategies.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Privacy Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Storing user data requires careful consideration of privacy laws and user consent.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vector stores and LLM calls can be expensive. Monitor usage and optimize retrieval strategies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Next Steps</h2>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/types">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Types
            </Link>
          </Button>
          <Button asChild>
            <Link href="/advanced">
              Advanced Topics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

