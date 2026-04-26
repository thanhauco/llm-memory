import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/CodeBlock"
import { Diagram } from "@/components/Diagram"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function GettingStarted() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge>Beginner</Badge>
        <h1 className="text-4xl font-bold text-foreground">Getting Started with LLM Memory</h1>
        <p className="text-xl text-muted-foreground">
          Learn the fundamentals of memory in Large Language Models and why it's crucial for building intelligent AI systems.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">What is LLM Memory?</h2>
        <p className="text-lg text-foreground">
          LLM Memory refers to the ability of Large Language Models to retain, recall, and utilize information across
          multiple interactions or within a single conversation. Unlike traditional databases, LLM memory is more nuanced
          and involves various techniques to help models remember context, facts, and user preferences.
        </p>
        <p className="text-lg text-foreground">
          Memory in LLMs is essential because:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
          <li>Models have limited context windows (token limits)</li>
          <li>Each API call is stateless by default</li>
          <li>Users expect continuity in conversations</li>
          <li>Personalization requires remembering user preferences</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Why Memory Matters</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Context Continuity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Memory enables conversations to feel natural and continuous, allowing users to reference previous
                parts of the conversation without repeating information.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personalization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By remembering user preferences, past interactions, and context, LLMs can provide more relevant
                and personalized responses.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Memory reduces the need to re-send context in every request, saving tokens and improving response times.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Better User Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Users expect AI assistants to remember their interactions, making memory a critical component
                for user satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Basic Concepts</h2>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Context Window</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                The context window is the maximum number of tokens (words/subwords) that a model can process
                in a single request. This is a hard limit that determines how much information can be included
                in one conversation.
              </p>
              <p className="text-sm text-muted-foreground">
                Example: GPT-4 has a context window of 128k tokens, while GPT-3.5-turbo has 16k tokens.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Tokens are the basic units of text that LLMs process. They can be words, parts of words, or
                even characters, depending on the tokenization method used.
              </p>
              <CodeBlock
                code={`// Example: Tokenizing text
const text = "Hello, world!";
// Might be tokenized as: ["Hello", ",", " world", "!"]
// Or: ["Hel", "lo", ",", " world", "!"]`}
                language="typescript"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>State Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Since LLM APIs are stateless, you need to manage conversation state yourself. This typically
                involves maintaining a conversation history and deciding what to include in each request.
              </p>
              <CodeBlock
                code={`// Simple state management example
interface ConversationState {
  messages: Array<{ role: string; content: string }>;
  userPreferences: Record<string, any>;
  context: string;
}

const state: ConversationState = {
  messages: [],
  userPreferences: {},
  context: ""
};`}
                language="typescript"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Simple Example</h2>
        <p className="text-lg text-foreground">
          Here's a basic example of maintaining conversation history:
        </p>
        <CodeBlock
          code={`async function chatWithMemory(userMessage: string) {
  // Load previous conversation history
  const history = await loadConversationHistory();
  
  // Add user message to history
  history.push({ role: "user", content: userMessage });
  
  // Call LLM with full history
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: history,
  });
  
  // Add assistant response to history
  history.push({
    role: "assistant",
    content: response.choices[0].message.content
  });
  
  // Save updated history
  await saveConversationHistory(history);
  
  return response.choices[0].message.content;
}`}
          language="typescript"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">Next Steps</h2>
        <p className="text-lg text-foreground">
          Now that you understand the basics, explore more advanced concepts:
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/concepts">
              Learn Core Concepts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/types">Explore Memory Types</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

