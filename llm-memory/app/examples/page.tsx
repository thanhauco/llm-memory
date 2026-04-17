"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/CodeBlock"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Examples() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Examples</Badge>
        <h1 className="text-4xl font-bold text-foreground">Code Examples & Demos</h1>
        <p className="text-xl text-muted-foreground">
          Interactive code examples demonstrating various memory implementation patterns.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Example 1: Basic Conversation History</h2>
        <Card>
          <CardHeader>
            <CardTitle>Simple Message History Manager</CardTitle>
            <CardDescription>
              A basic implementation for maintaining conversation history in a chat application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`// Basic conversation history manager
class ConversationHistory {
  private messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
  }> = [];
  
  addMessage(role: "user" | "assistant" | "system", content: string) {
    this.messages.push({
      role,
      content,
      timestamp: new Date()
    });
  }
  
  getMessages() {
    return this.messages.map(({ role, content }) => ({
      role,
      content
    }));
  }
  
  clear() {
    this.messages = [];
  }
  
  getRecentMessages(count: number = 10) {
    return this.messages.slice(-count);
  }
}

// Usage
const history = new ConversationHistory();

history.addMessage("system", "You are a helpful assistant.");
history.addMessage("user", "What is LLM memory?");
history.addMessage("assistant", "LLM memory refers to...");

const context = history.getMessages();
// Use context in your LLM API call`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Example 2: Token-Aware History Manager</h2>
        <Card>
          <CardHeader>
            <CardTitle>Managing Context Window Limits</CardTitle>
            <CardDescription>
              An implementation that respects token limits by trimming old messages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`import { encoding_for_model } from "tiktoken";

class TokenAwareHistory {
  private messages: Message[] = [];
  private maxTokens: number;
  private model: string;
  
  constructor(maxTokens: number = 4000, model: string = "gpt-4") {
    this.maxTokens = maxTokens;
    this.model = model;
  }
  
  addMessage(role: string, content: string) {
    this.messages.push({ role, content });
    this.trimToFit();
  }
  
  private trimToFit() {
    const enc = encoding_for_model(this.model);
    let totalTokens = this.countTokens(this.messages, enc);
    
    // Keep system message
    const systemMsg = this.messages.find(m => m.role === "system");
    const otherMsgs = this.messages.filter(m => m.role !== "system");
    
    // Remove oldest messages until we fit
    while (totalTokens > this.maxTokens && otherMsgs.length > 1) {
      otherMsgs.shift();
      totalTokens = this.countTokens(
        [...(systemMsg ? [systemMsg] : []), ...otherMsgs],
        enc
      );
    }
    
    this.messages = [
      ...(systemMsg ? [systemMsg] : []),
      ...otherMsgs
    ];
  }
  
  private countTokens(messages: Message[], enc: any): number {
    return messages.reduce((sum, msg) => {
      const tokens = enc.encode(
        \`\${msg.role}: \${msg.content}\`
      );
      return sum + tokens.length;
    }, 0);
  }
  
  getMessages() {
    return this.messages;
  }
}

// Usage
const history = new TokenAwareHistory(4000, "gpt-4");
history.addMessage("system", "You are helpful.");
history.addMessage("user", "Tell me about memory...");
// Automatically trims if exceeds token limit`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Example 3: Vector Memory Store</h2>
        <Card>
          <CardHeader>
            <CardTitle>Semantic Memory with Vector Search</CardTitle>
            <CardDescription>
              Using embeddings and vector databases for semantic memory retrieval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "langchain/vectorstores/chroma";

class VectorMemoryStore {
  private vectorStore: Chroma;
  private embeddings: OpenAIEmbeddings;
  
  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    });
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
      metadata: {
        ...metadata,
        timestamp: metadata.timestamp.toISOString()
      }
    }]);
  }
  
  async retrieveRelevant(
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
  
  async getContextForQuery(query: string, userId: string): Promise<string> {
    const memories = await this.retrieveRelevant(query, userId);
    
    if (memories.length === 0) {
      return "";
    }
    
    return \`Relevant past context:\\n\\n\${memories
      .map((m, i) => \`\${i + 1}. \${m.content}\`)
      .join("\\n\\n")}\`;
  }
}

// Usage
const memoryStore = new VectorMemoryStore();

// Store a memory
await memoryStore.storeMemory(
  "User prefers dark mode and Python programming",
  {
    userId: "user123",
    timestamp: new Date(),
    type: "preference"
  }
);

// Retrieve relevant memories
const context = await memoryStore.getContextForQuery(
  "What are my preferences?",
  "user123"
);`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Example 4: Complete Memory System</h2>
        <Card>
          <CardHeader>
            <CardTitle>Hybrid Memory System</CardTitle>
            <CardDescription>
              A complete implementation combining short-term, long-term, and semantic memory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`class CompleteMemorySystem {
  private shortTerm: TokenAwareHistory;
  private vectorStore: VectorMemoryStore;
  private database: Database;
  
  constructor() {
    this.shortTerm = new TokenAwareHistory(4000);
    this.vectorStore = new VectorMemoryStore();
    this.database = new Database();
  }
  
  async processQuery(userId: string, query: string): Promise<string> {
    // 1. Get short-term context
    const shortTermContext = this.shortTerm.getMessages();
    
    // 2. Retrieve relevant long-term memories
    const relevantMemories = await this.vectorStore
      .retrieveRelevant(query, userId, 5);
    
    // 3. Get user preferences
    const preferences = await this.database.getUserPreferences(userId);
    
    // 4. Build comprehensive context
    const context = this.buildContext({
      shortTerm: shortTermContext,
      longTerm: relevantMemories,
      preferences
    });
    
    // 5. Generate response
    const response = await this.generateResponse(context, query);
    
    // 6. Update all memory stores
    await this.updateMemories(userId, query, response);
    
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
  
  private async generateResponse(context: string, query: string): Promise<string> {
    // Call your LLM API here
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: context },
        { role: "user", content: query }
      ]
    });
    
    return response.choices[0].message.content || "";
  }
  
  private async updateMemories(
    userId: string,
    query: string,
    response: string
  ) {
    // Update short-term
    this.shortTerm.addMessage("user", query);
    this.shortTerm.addMessage("assistant", response);
    
    // Store in vector store
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
  }
}

// Usage
const memorySystem = new CompleteMemorySystem();
const response = await memorySystem.processQuery(
  "user123",
  "What did we discuss yesterday?"
);`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Example 5: RAG Implementation</h2>
        <Card>
          <CardHeader>
            <CardTitle>Retrieval-Augmented Generation</CardTitle>
            <CardDescription>
              Implementing RAG to augment LLM responses with external knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`import { OpenAI } from "@langchain/openai";
import { VectorStoreRetriever } from "langchain/vectorstores/base";

class RAGSystem {
  private llm: OpenAI;
  private retriever: VectorStoreRetriever;
  
  constructor() {
    this.llm = new OpenAI({
      temperature: 0.7,
      modelName: "gpt-4"
    });
    this.retriever = new VectorStoreRetriever({
      vectorStore: vectorStore,
      k: 5
    });
  }
  
  async query(userQuery: string): Promise<string> {
    // 1. Retrieve relevant documents
    const docs = await this.retriever.getRelevantDocuments(userQuery);
    
    // 2. Build context from documents
    const context = docs
      .map(doc => doc.pageContent)
      .join("\\n\\n---\\n\\n");
    
    // 3. Build prompt with context
    const prompt = \`Use the following context to answer the question. 
If the context doesn't contain the answer, say so.

Context:
\${context}

Question: \${userQuery}

Answer:\`;
    
    // 4. Generate response
    const response = await this.llm.call(prompt);
    
    return response;
  }
  
  async addDocument(content: string, metadata?: any) {
    await this.retriever.vectorStore.addDocuments([{
      pageContent: content,
      metadata: metadata || {}
    }]);
  }
}

// Usage
const rag = new RAGSystem();

// Add documents to knowledge base
await rag.addDocument(
  "LLM memory is crucial for maintaining context...",
  { source: "textbook", page: 42 }
);

// Query with RAG
const answer = await rag.query(
  "What is the importance of LLM memory?"
);`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Try It Yourself</h2>
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              These examples demonstrate various memory patterns. To implement them:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
              <li>Choose the pattern that fits your use case</li>
              <li>Install required dependencies (OpenAI SDK, LangChain, etc.)</li>
              <li>Set up your vector database (Pinecone, Chroma, etc.)</li>
              <li>Adapt the code to your specific requirements</li>
              <li>Test with your data and iterate</li>
            </ul>
            <div className="flex gap-4 pt-4">
              <Button asChild variant="outline">
                <Link href="/implementations">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Implementations
                </Link>
              </Button>
              <Button asChild>
                <Link href="/resources">View Resources</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

