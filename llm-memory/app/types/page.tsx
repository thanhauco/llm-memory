import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/CodeBlock"
import { Diagram } from "@/components/Diagram"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

export default function Types() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Intermediate</Badge>
        <h1 className="text-4xl font-bold text-foreground">Types of LLM Memory</h1>
        <p className="text-xl text-muted-foreground">
          Explore different types of memory systems used in LLM applications and their use cases.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Classification</h2>
        <p className="text-lg text-foreground">
          LLM memory can be categorized in several ways. Here are the main types:
        </p>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>1. Short-term Memory (Working Memory)</CardTitle>
              <CardDescription>Ephemeral, conversation-scoped memory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Short-term memory (also called working memory) maintains the current conversation context. 
                It's the most immediate form of memory, stored temporarily during a session and typically 
                discarded when the conversation ends. This is analogous to human working memory - the 
                information you're actively thinking about right now.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">Key Characteristics:</h4>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                  <li><strong>Storage:</strong> RAM or session storage (in-memory)</li>
                  <li><strong>Scope:</strong> Limited to current conversation/session</li>
                  <li><strong>Speed:</strong> Fast access, low latency (milliseconds)</li>
                  <li><strong>Persistence:</strong> Lost when session ends (unless explicitly saved)</li>
                  <li><strong>Capacity:</strong> Limited by context window size (typically 4K-128K tokens)</li>
                  <li><strong>Use Case:</strong> Maintaining conversation flow, immediate context</li>
                </ul>
              </div>

              <Diagram
                chart={`flowchart TD
    A[User Message] --> B[Add to Short-term Memory]
    B --> C[Conversation History Array]
    C --> D{Context Window Full?}
    D -->|No| E[Include in LLM Request]
    D -->|Yes| F[Trim Oldest Messages]
    F --> E
    E --> G[LLM Response]
    G --> H[Add Response to Memory]
    H --> I[Return to User]
    
    style C fill:#e1f5ff
    style E fill:#fff4e1`}
                title="Short-term Memory Flow"
              />

              <CodeBlock
                code={`// Enhanced short-term memory implementation
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  tokens?: number;
}

class ShortTermMemory {
  private messages: Message[] = [];
  private maxTokens: number = 4000;
  private systemMessage?: Message;
  
  constructor(maxTokens: number = 4000) {
    this.maxTokens = maxTokens;
  }
  
  setSystemMessage(content: string) {
    this.systemMessage = {
      role: "system",
      content,
      timestamp: new Date()
    };
  }
  
  addMessage(role: "user" | "assistant", content: string) {
    const message: Message = {
      role,
      content,
      timestamp: new Date(),
      tokens: this.estimateTokens(content)
    };
    
    this.messages.push(message);
    this.trimToFit();
  }
  
  private trimToFit() {
    let totalTokens = this.getTotalTokens();
    
    // Always keep system message
    const regularMessages = this.messages;
    
    // Remove oldest messages until we fit
    while (totalTokens > this.maxTokens && regularMessages.length > 1) {
      regularMessages.shift();
      totalTokens = this.getTotalTokens();
    }
    
    this.messages = regularMessages;
  }
  
  private getTotalTokens(): number {
    const systemTokens = this.systemMessage 
      ? this.estimateTokens(this.systemMessage.content) 
      : 0;
    const messageTokens = this.messages.reduce(
      (sum, msg) => sum + (msg.tokens || this.estimateTokens(msg.content)), 
      0
    );
    return systemTokens + messageTokens;
  }
  
  private estimateTokens(text: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }
  
  getContext(): Message[] {
    return [
      ...(this.systemMessage ? [this.systemMessage] : []),
      ...this.messages
    ];
  }
  
  getRecentMessages(count: number): Message[] {
    return this.messages.slice(-count);
  }
  
  clear() {
    this.messages = [];
  }
  
  getStats() {
    return {
      messageCount: this.messages.length,
      totalTokens: this.getTotalTokens(),
      maxTokens: this.maxTokens,
      utilization: (this.getTotalTokens() / this.maxTokens * 100).toFixed(1) + "%"
    };
  }
}

// Usage example
const memory = new ShortTermMemory(4000);
memory.setSystemMessage("You are a helpful assistant.");
memory.addMessage("user", "What is machine learning?");
memory.addMessage("assistant", "Machine learning is...");
console.log(memory.getStats());`}
                language="typescript"
              />

              <div className="bg-accent/50 p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 text-foreground">When to Use Short-term Memory:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                  <li>Chat applications where conversation context is sufficient</li>
                  <li>Single-session interactions that don't require persistence</li>
                  <li>Applications prioritizing speed and low latency</li>
                  <li>Privacy-sensitive scenarios where data shouldn't persist</li>
                  <li>Prototyping and development where simplicity is key</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Long-term Memory (Episodic Memory)</CardTitle>
              <CardDescription>Persistent, user-scoped memory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Long-term memory persists across sessions and stores information about past interactions,
                user preferences, and learned facts. This is similar to human long-term memory - information
                that persists over time and can be recalled later. Episodic memory specifically refers to
                memory of specific events and experiences in chronological order.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">Key Characteristics:</h4>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                  <li><strong>Storage:</strong> Databases (SQL, NoSQL, or vector DBs)</li>
                  <li><strong>Scope:</strong> User-scoped, persists across sessions</li>
                  <li><strong>Speed:</strong> Slower than short-term (database queries)</li>
                  <li><strong>Persistence:</strong> Permanent until explicitly deleted</li>
                  <li><strong>Capacity:</strong> Virtually unlimited (depends on storage)</li>
                  <li><strong>Use Case:</strong> Personalization, user history, learned facts</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2 text-foreground">Episodic Memory Explained:</h4>
                <p className="text-foreground text-sm">
                  Episodic memory stores specific events and experiences with temporal context. 
                  Each memory is a "snapshot" of a particular interaction, including what happened,
                  when it happened, and the context. This allows the system to recall past conversations
                  and reference them in future interactions.
                </p>
              </div>

              <Diagram
                chart={`flowchart TD
    A[User Interaction] --> B{Important Event?}
    B -->|Yes| C[Extract Key Information]
    B -->|No| D[Discard]
    C --> E[Store as Episode]
    E --> F[Database with Metadata]
    F --> G[Timestamp, User ID, Context]
    G --> H[Future Query]
    H --> I[Retrieve Relevant Episodes]
    I --> J[Include in Context]
    J --> K[LLM Response]
    
    style E fill:#e1f5ff
    style F fill:#fff4e1`}
                title="Episodic Memory Storage and Retrieval"
              />

              <CodeBlock
                code={`// Comprehensive long-term/episodic memory implementation
interface Episode {
  id: string;
  userId: string;
  timestamp: Date;
  type: "conversation" | "preference" | "fact" | "event";
  content: string;
  context: Record<string, any>;
  importance: number; // 0-1 scale
  tags: string[];
}

interface UserPreferences {
  language: string;
  timezone: string;
  theme: "light" | "dark";
  notificationSettings: Record<string, boolean>;
  customSettings: Record<string, any>;
}

interface LongTermMemory {
  userId: string;
  episodes: Episode[];
  preferences: UserPreferences;
  facts: Map<string, any>; // Key-value facts
  createdAt: Date;
  updatedAt: Date;
}

class LongTermMemoryStore {
  private db: Database;
  
  constructor(db: Database) {
    this.db = db;
  }
  
  // Store an episodic memory
  async storeEpisode(episode: Omit<Episode, "id" | "timestamp">): Promise<Episode> {
    const fullEpisode: Episode = {
      ...episode,
      id: this.generateId(),
      timestamp: new Date()
    };
    
    await this.db.episodes.insert(fullEpisode);
    return fullEpisode;
  }
  
  // Retrieve relevant episodes based on query
  async retrieveRelevantEpisodes(
    userId: string,
    query: string,
    limit: number = 10
  ): Promise<Episode[]> {
    // Strategy 1: Recency-based (most recent first)
    const recentEpisodes = await this.db.episodes
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit);
    
    // Strategy 2: Importance-based
    const importantEpisodes = await this.db.episodes
      .find({ userId })
      .sort({ importance: -1, timestamp: -1 })
      .limit(limit);
    
    // Strategy 3: Tag-based search
    const queryTags = this.extractTags(query);
    const taggedEpisodes = await this.db.episodes
      .find({ 
        userId,
        tags: { $in: queryTags }
      })
      .sort({ timestamp: -1 })
      .limit(limit);
    
    // Combine and deduplicate
    const allEpisodes = [
      ...recentEpisodes,
      ...importantEpisodes,
      ...taggedEpisodes
    ];
    
    return this.deduplicateEpisodes(allEpisodes)
      .slice(0, limit);
  }
  
  // Store user preference
  async updatePreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ) {
    await this.db.memory.upsert({
      where: { userId },
      update: {
        preferences: {
          ...existing.preferences,
          ...preferences
        },
        updatedAt: new Date()
      },
      create: {
        userId,
        preferences: preferences as UserPreferences,
        episodes: [],
        facts: {},
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }
  
  // Store a fact
  async storeFact(userId: string, key: string, value: any) {
    await this.db.memory.update({
      where: { userId },
      data: {
        facts: {
          [key]: value
        },
        updatedAt: new Date()
      }
    });
  }
  
  // Retrieve user's complete memory
  async getMemory(userId: string): Promise<LongTermMemory | null> {
    return await this.db.memory.findUnique({
      where: { userId },
      include: {
        episodes: {
          orderBy: { timestamp: "desc" },
          take: 100 // Last 100 episodes
        }
      }
    });
  }
  
  // Build context from long-term memory
  async buildContext(userId: string, query: string): Promise<string> {
    const memory = await this.getMemory(userId);
    if (!memory) return "";
    
    const relevantEpisodes = await this.retrieveRelevantEpisodes(userId, query, 5);
    
    const contextParts = [
      "User Preferences: " + JSON.stringify(memory.preferences),
      "Relevant Past Episodes:",
      ...relevantEpisodes.map((ep, i) => 
        (i + 1) + ". [" + ep.timestamp.toISOString() + "] " + ep.type + ": " + ep.content
      ),
      "Stored Facts: " + JSON.stringify(Object.fromEntries(memory.facts))
    ];
    
    return contextParts.join("\\n\\n");
  }
  
  private generateId(): string {
    return "ep_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }
  
  private extractTags(text: string): string[] {
    // Simple tag extraction - can be enhanced with NLP
    const words = text.toLowerCase().split(/\\s+/);
    return words.filter(w => w.length > 3);
  }
  
  private deduplicateEpisodes(episodes: Episode[]): Episode[] {
    const seen = new Set<string>();
    return episodes.filter(ep => {
      if (seen.has(ep.id)) return false;
      seen.add(ep.id);
      return true;
    });
  }
}

// Usage example
const memoryStore = new LongTermMemoryStore(db);

// Store an episode
await memoryStore.storeEpisode({
  userId: "user123",
  type: "conversation",
  content: "User asked about Python async programming",
  context: { topic: "programming", language: "python" },
  importance: 0.7,
  tags: ["python", "async", "programming"]
});

// Retrieve context for a query
const context = await memoryStore.buildContext("user123", "python async");
console.log(context);`}
                language="typescript"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-accent/50 p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">Episodic Memory Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                    <li>Temporal ordering of events</li>
                    <li>Context preservation</li>
                    <li>Importance scoring</li>
                    <li>Tag-based organization</li>
                    <li>Selective retrieval</li>
                  </ul>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">When to Use Long-term Memory:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                    <li>Personalized AI assistants</li>
                    <li>Multi-session applications</li>
                    <li>Learning user preferences</li>
                    <li>Building user profiles</li>
                    <li>Historical context needs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Semantic Memory</CardTitle>
              <CardDescription>Meaning-based, vector-encoded memory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Semantic memory stores information as embeddings (vector representations) that capture meaning.
                This enables similarity-based retrieval even when exact keywords don't match. Unlike episodic
                memory which stores specific events, semantic memory stores general knowledge and concepts
                that can be retrieved based on meaning rather than exact matches.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-foreground">Key Characteristics:</h4>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                  <li><strong>Storage:</strong> Vector databases (Pinecone, Weaviate, Chroma, etc.)</li>
                  <li><strong>Encoding:</strong> Text embeddings (OpenAI, Cohere, sentence-transformers)</li>
                  <li><strong>Retrieval:</strong> Similarity search (cosine similarity, dot product)</li>
                  <li><strong>Advantage:</strong> Finds relevant content even without exact keyword matches</li>
                  <li><strong>Use Case:</strong> Knowledge bases, document search, concept retrieval</li>
                </ul>
              </div>

              <Diagram
                chart={`flowchart TD
    A[User Query] --> B[Generate Embedding]
    B --> C[Vector Database]
    C --> D[Similarity Search]
    D --> E[Retrieve Top K Results]
    E --> F[Rank by Relevance]
    F --> G[Include in Context]
    G --> H[LLM Response]
    
    I[Store Memory] --> J[Generate Embedding]
    J --> K[Store Vector + Metadata]
    K --> C
    
    style C fill:#e1f5ff
    style D fill:#fff4e1`}
                title="Semantic Memory Retrieval"
              />

              <CodeBlock
                code={`// Enhanced semantic memory with vector search
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";

interface SemanticMemory {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    userId?: string;
    timestamp: Date;
    type: string;
    tags: string[];
    importance: number;
  };
}

class SemanticMemoryStore {
  private embeddings: OpenAIEmbeddings;
  private vectorDB: Pinecone;
  private indexName: string;
  
  constructor(apiKey: string, indexName: string = "memories") {
    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: apiKey });
    this.vectorDB = new Pinecone({ apiKey });
    this.indexName = indexName;
  }
  
  // Store semantic memory
  async storeMemory(
    text: string,
    metadata: Omit<SemanticMemory["metadata"], "timestamp">
  ): Promise<string> {
    // Generate embedding
    const embedding = await this.embeddings.embedQuery(text);
    
    // Generate unique ID
    const id = \`mem_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    
    // Store in vector database
    await this.vectorDB.index(this.indexName).upsert({
      id,
      values: embedding,
      metadata: {
        ...metadata,
        text,
        timestamp: new Date().toISOString()
      }
    });
    
    return id;
  }
  
  // Retrieve similar memories
  async retrieveSimilar(
    query: string,
    options: {
      topK?: number;
      userId?: string;
      minScore?: number;
      filter?: Record<string, any>;
    } = {}
  ): Promise<Array<SemanticMemory & { score: number }>> {
    const {
      topK = 5,
      userId,
      minScore = 0.7,
      filter = {}
    } = options;
    
    // Generate query embedding
    const queryEmbedding = await this.embeddings.embedQuery(query);
    
    // Build filter
    const metadataFilter: any = { ...filter };
    if (userId) {
      metadataFilter.userId = userId;
    }
    
    // Query vector database
    const results = await this.vectorDB.index(this.indexName).query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
      filter: Object.keys(metadataFilter).length > 0 ? metadataFilter : undefined
    });
    
    // Filter by minimum score and format results
    return results.matches
      .filter(match => (match.score || 0) >= minScore)
      .map(match => ({
        id: match.id,
        text: match.metadata?.text as string,
        embedding: match.values || [],
        metadata: {
          ...match.metadata,
          timestamp: new Date(match.metadata?.timestamp as string)
        } as SemanticMemory["metadata"],
        score: match.score || 0
      }));
  }
  
  // Hybrid search: combine semantic and keyword search
  async hybridSearch(
    query: string,
    options: {
      topK?: number;
      semanticWeight?: number;
      keywordWeight?: number;
    } = {}
  ) {
    const { topK = 5, semanticWeight = 0.7, keywordWeight = 0.3 } = options;
    
    // Semantic search
    const semanticResults = await this.retrieveSimilar(query, { topK: topK * 2 });
    
    // Keyword search (simplified - in production, use full-text search)
    const keywords = query.toLowerCase().split(/\\s+/);
    // This would typically query a full-text search index
    
    // Combine and re-rank
    // In production, use more sophisticated ranking algorithms
    return semanticResults.slice(0, topK);
  }
  
  // Update memory importance
  async updateImportance(memoryId: string, importance: number) {
    const memory = await this.vectorDB.index(this.indexName).fetch([memoryId]);
    if (memory.records[memoryId]) {
      await this.vectorDB.index(this.indexName).update({
        id: memoryId,
        metadata: {
          ...memory.records[memoryId].metadata,
          importance
        }
      });
    }
  }
  
  // Delete memory
  async deleteMemory(memoryId: string) {
    await this.vectorDB.index(this.indexName).delete([memoryId]);
  }
}

// Usage example
const semanticStore = new SemanticMemoryStore(process.env.PINECONE_API_KEY!);

// Store a semantic memory
const memoryId = await semanticStore.storeMemory(
  "User prefers dark mode and works primarily with Python",
  {
    userId: "user123",
    type: "preference",
    tags: ["ui", "python", "preferences"],
    importance: 0.8
  }
);

// Retrieve similar memories
const similar = await semanticStore.retrieveSimilar(
  "What are my UI preferences?",
  {
    topK: 5,
    userId: "user123",
    minScore: 0.7
  }
);

console.log("Found", similar.length, "similar memories");
similar.forEach(mem => {
  console.log(\`- [Score: \${mem.score.toFixed(2)}] \${mem.text}\`);
});`}
                language="typescript"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-accent/50 p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">Semantic vs Episodic:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                    <li><strong>Semantic:</strong> General knowledge, concepts</li>
                    <li><strong>Episodic:</strong> Specific events, experiences</li>
                    <li><strong>Semantic:</strong> Meaning-based retrieval</li>
                    <li><strong>Episodic:</strong> Time-based retrieval</li>
                  </ul>
                </div>
                <div className="bg-accent/50 p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-foreground">When to Use Semantic Memory:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                    <li>Large knowledge bases</li>
                    <li>Fuzzy search requirements</li>
                    <li>Document Q&A systems</li>
                    <li>Concept-based retrieval</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Procedural Memory</CardTitle>
              <CardDescription>Skill and pattern-based memory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Procedural memory stores learned patterns, workflows, and procedures. This is often implemented
                through fine-tuning or prompt engineering with few-shot examples.
              </p>
              <CodeBlock
                code={`// Procedural memory through few-shot learning
const proceduralMemory = {
  taskPatterns: [
    {
      task: "email_summarization",
      steps: ["extract_key_points", "identify_action_items", "format_summary"],
      examples: [...]
    },
    {
      task: "code_review",
      steps: ["analyze_structure", "check_best_practices", "suggest_improvements"],
      examples: [...]
    }
  ]
};

function buildPromptWithProceduralMemory(task: string, input: string) {
  const pattern = proceduralMemory.taskPatterns.find(p => p.task === task);
  return \`Task: \${task}
Steps: \${pattern.steps.join(", ")}

Examples:
\${pattern.examples.map(e => \`Input: \${e.input}\\nOutput: \${e.output}\`).join("\\n\\n")}

Now process this input:
\${input}\`;
}`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. External Memory (RAG)</CardTitle>
              <CardDescription>Retrieval-Augmented Generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                External memory uses retrieval-augmented generation (RAG) to fetch relevant information from
                external knowledge bases at query time, rather than storing it in the model's parameters.
              </p>
              <Diagram
                chart={`flowchart LR
    A[User Query] --> B[Query Processing]
    B --> C[Retrieve from Knowledge Base]
    C --> D[Combine with Query]
    D --> E[LLM Generation]
    E --> F[Response]
    
    G[Knowledge Base] --> C
    H[Vector Store] --> C
    I[Documents] --> C`}
                title="RAG Architecture"
              />
              <CodeBlock
                code={`// RAG implementation
async function ragQuery(userQuery: string) {
  // 1. Retrieve relevant documents
  const relevantDocs = await vectorStore.similaritySearch(
    userQuery,
    { topK: 5 }
  );
  
  // 2. Build context
  const context = relevantDocs
    .map(doc => doc.pageContent)
    .join("\\n\\n");
  
  // 3. Generate with context
  const prompt = \`Use the following context to answer the question:
  
Context:
\${context}

Question: \${userQuery}

Answer:\`;
  
  const response = await llm.generate(prompt);
  return response;
}`}
                language="typescript"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Hierarchy</h2>
        <p className="text-lg text-foreground">
          In practice, most LLM applications use a combination of memory types:
        </p>
        <Diagram
          chart={`graph TD
    A[User Query] --> B[Short-term Memory]
    B --> C[Long-term Memory]
    C --> D[Semantic Memory]
    D --> E[External Memory RAG]
    E --> F[LLM Response]
    
    B --> G[Current Session]
    C --> H[User History]
    D --> I[Vector Store]
    E --> J[Knowledge Base]`}
          title="Memory Hierarchy"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Memory Type Comparison</h2>
        <p className="text-lg text-foreground">
          Understanding the differences between memory types helps you choose the right approach for your use case.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left font-semibold text-foreground">Feature</th>
                <th className="border border-border p-3 text-left font-semibold text-foreground">Short-term</th>
                <th className="border border-border p-3 text-left font-semibold text-foreground">Long-term/Episodic</th>
                <th className="border border-border p-3 text-left font-semibold text-foreground">Semantic</th>
                <th className="border border-border p-3 text-left font-semibold text-foreground">RAG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Storage Location</td>
                <td className="border border-border p-3 text-foreground">RAM/Session</td>
                <td className="border border-border p-3 text-foreground">Database</td>
                <td className="border border-border p-3 text-foreground">Vector DB</td>
                <td className="border border-border p-3 text-foreground">External KB</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border border-border p-3 font-medium text-foreground">Persistence</td>
                <td className="border border-border p-3 text-foreground">Session only</td>
                <td className="border border-border p-3 text-foreground">Permanent</td>
                <td className="border border-border p-3 text-foreground">Permanent</td>
                <td className="border border-border p-3 text-foreground">External source</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Access Speed</td>
                <td className="border border-border p-3 text-foreground">Very Fast (ms)</td>
                <td className="border border-border p-3 text-foreground">Fast (10-100ms)</td>
                <td className="border border-border p-3 text-foreground">Medium (50-200ms)</td>
                <td className="border border-border p-3 text-foreground">Medium (100-500ms)</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border border-border p-3 font-medium text-foreground">Capacity</td>
                <td className="border border-border p-3 text-foreground">Limited (context window)</td>
                <td className="border border-border p-3 text-foreground">Very Large</td>
                <td className="border border-border p-3 text-foreground">Very Large</td>
                <td className="border border-border p-3 text-foreground">Unlimited</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Retrieval Method</td>
                <td className="border border-border p-3 text-foreground">Sequential</td>
                <td className="border border-border p-3 text-foreground">Query-based</td>
                <td className="border border-border p-3 text-foreground">Similarity search</td>
                <td className="border border-border p-3 text-foreground">Vector + keyword</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border border-border p-3 font-medium text-foreground">Best For</td>
                <td className="border border-border p-3 text-foreground">Current conversation</td>
                <td className="border border-border p-3 text-foreground">User history</td>
                <td className="border border-border p-3 text-foreground">Concept search</td>
                <td className="border border-border p-3 text-foreground">Knowledge bases</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Complexity</td>
                <td className="border border-border p-3 text-foreground">Low</td>
                <td className="border border-border p-3 text-foreground">Medium</td>
                <td className="border border-border p-3 text-foreground">Medium-High</td>
                <td className="border border-border p-3 text-foreground">High</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Memory Type Use Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Short-term Memory:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                <li>Chat applications (Discord bots, Slack assistants)</li>
                <li>Single-session interactions</li>
                <li>Quick prototypes and demos</li>
                <li>Privacy-sensitive applications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Long-term/Episodic Memory:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                <li>Personal AI assistants (remembering user preferences)</li>
                <li>Customer support systems (conversation history)</li>
                <li>Learning systems (tracking user progress)</li>
                <li>Personalized recommendation systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Semantic Memory:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                <li>Document Q&A systems</li>
                <li>Knowledge base search</li>
                <li>Content recommendation</li>
                <li>Concept-based information retrieval</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">RAG (External Memory):</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground ml-4">
                <li>Enterprise knowledge bases</li>
                <li>Real-time information systems</li>
                <li>Domain-specific applications</li>
                <li>Systems requiring source citations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Use Short-term Memory When:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Building chat interfaces</li>
                <li>Need fast, low-latency responses</li>
                <li>Conversation context is sufficient</li>
                <li>Privacy is a concern (no persistence)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Use Long-term Memory When:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Building personalized assistants</li>
                <li>Need to remember user preferences</li>
                <li>Multi-session applications</li>
                <li>User history is important</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Use Semantic Memory When:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Large knowledge bases</li>
                <li>Fuzzy search requirements</li>
                <li>Document Q&A systems</li>
                <li>Need similarity-based retrieval</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Use RAG When:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Real-time information needed</li>
                <li>Large document collections</li>
                <li>Domain-specific knowledge</li>
                <li>Need to cite sources</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Next Steps</h2>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/concepts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Concepts
            </Link>
          </Button>
          <Button asChild>
            <Link href="/implementations">
              Learn Implementations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

