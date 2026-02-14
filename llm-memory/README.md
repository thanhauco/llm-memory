# LLM Memory Learning Site

A comprehensive educational website built with Next.js that teaches everything about LLM (Large Language Model) memory systems, from beginner concepts to expert-level implementations.

## 📚 Overview

This site provides a structured learning path for understanding and implementing memory systems in LLM applications. It covers fundamental concepts, different memory types, implementation patterns, advanced architectures, and practical code examples.

### Learning Path

- **Beginner**: Introduction to LLM memory, basic concepts, and why it matters
- **Intermediate**: Memory types, architectures, and implementation patterns
- **Expert**: Advanced topics, optimization techniques, and cutting-edge research

## ✨ Features

- **Progressive Learning Path**: Clear progression from beginner to expert
- **Interactive Code Examples**: Runnable code snippets demonstrating memory concepts
- **Visual Diagrams**: Mermaid diagrams explaining architectures and data flows
- **Full-Text Search**: Search across all content to quickly find topics
- **Dark Mode**: Theme toggle for better reading experience
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Modern UI**: Clean, accessible design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components inspired by shadcn/ui
- **Code Highlighting**: react-syntax-highlighter
- **Diagrams**: Mermaid.js
- **Theme Management**: next-themes
- **Icons**: Lucide React

## 📁 Project Structure

```
llm-memory/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Home page
│   ├── globals.css              # Global styles and theme variables
│   ├── getting-started/         # Beginner introduction
│   ├── concepts/                # Core memory concepts
│   ├── types/                   # Different memory types
│   ├── implementations/         # Implementation patterns
│   ├── advanced/                # Expert-level topics
│   ├── examples/                # Code examples and demos
│   └── resources/               # Additional learning materials
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── tabs.tsx
│   ├── CodeBlock.tsx            # Syntax-highlighted code blocks
│   ├── Diagram.tsx              # Mermaid diagram renderer
│   ├── Navigation.tsx           # Sidebar navigation
│   ├── SearchDialog.tsx         # Full-text search component
│   ├── theme-provider.tsx       # Theme context provider
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── lib/
│   └── utils.ts                 # Utility functions (cn helper)
├── content/                     # Content files (future expansion)
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd llm-memory
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 Content Overview

### Getting Started (`/getting-started`)
- What is LLM memory?
- Why memory matters
- Basic concepts (context window, tokens, state)
- Simple examples

### Concepts (`/concepts`)
- Memory architectures (short-term, long-term, semantic)
- Memory retrieval strategies
- Context window management
- Memory compression techniques

### Types (`/types`)
- Short-term Memory (Working Memory)
- Long-term Memory (Episodic Memory)
- Semantic Memory (Vector-based)
- Procedural Memory
- External Memory (RAG)

### Implementations (`/implementations`)
- Conversation History Manager
- Memory Store with Summarization
- Vector-based Memory Retrieval
- Hybrid Memory System
- Best practices and common pitfalls

### Advanced (`/advanced`)
- Hierarchical Memory System
- Memory Compression with Fine-tuning
- Graph-based Memory
- Performance Optimization
- Scaling Memory Systems
- Research & Cutting-edge Techniques

### Examples (`/examples`)
- Basic Conversation History
- Token-Aware History Manager
- Vector Memory Store
- Complete Memory System
- RAG Implementation

### Resources (`/resources`)
- Documentation & Guides
- Libraries & Tools
- Video Tutorials
- Research Papers
- Community & Forums

## 🎨 Customization

### Adding New Content

1. Create a new page in the `app/` directory:
```bash
mkdir app/new-topic
touch app/new-topic/page.tsx
```

2. Add navigation link in `components/Navigation.tsx`:
```typescript
{ name: "New Topic", href: "/new-topic", icon: IconName }
```

3. Add search content in `components/SearchDialog.tsx`:
```typescript
{
  title: "New Topic Title",
  description: "Description",
  href: "/new-topic",
  category: "Category"
}
```

### Styling

The site uses Tailwind CSS with custom theme variables defined in `app/globals.css`. Modify the CSS variables to change colors:

```css
:root {
  --primary: 0 0% 9%;
  --background: 0 0% 100%;
  /* ... */
}
```

### Code Block Themes

Code blocks automatically adapt to light/dark mode. To change themes, modify `components/CodeBlock.tsx`:

```typescript
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Prettier (recommended)

## 📋 Master Plan

### Phase 1: Foundation ✅ (Completed)
- [x] Next.js project setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Base UI components
- [x] Navigation and layout
- [x] Theme system (dark/light mode)

### Phase 2: Core Content ✅ (Completed)
- [x] Home page with learning path
- [x] Getting Started page (beginner content)
- [x] Concepts page (core concepts)
- [x] Types page (memory types)
- [x] Implementations page (patterns)
- [x] Advanced page (expert topics)
- [x] Examples page (code demos)
- [x] Resources page (links)

### Phase 3: Features ✅ (Completed)
- [x] Code syntax highlighting
- [x] Mermaid diagram rendering
- [x] Full-text search functionality
- [x] Responsive mobile navigation
- [x] Dark mode implementation

### Phase 4: Enhancements (Future)
- [ ] Interactive code playground
- [ ] User progress tracking
- [ ] Bookmark/favorite pages
- [ ] Print-friendly styles
- [ ] PDF export functionality
- [ ] Multi-language support
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Performance optimization (image optimization, lazy loading)
- [ ] Analytics integration
- [ ] Comment system for pages

### Phase 5: Advanced Features (Future)
- [ ] Live code execution examples
- [ ] Interactive memory visualization
- [ ] Quiz/assessment system
- [ ] Certificate generation
- [ ] User accounts and profiles
- [ ] Community contributions
- [ ] API documentation
- [ ] Integration with external tools

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically on push

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

### Environment Variables

No environment variables required for basic functionality. Optional variables for future features:
- `ANALYTICS_ID` - For analytics tracking
- `API_KEY` - For external API integrations

## 🤝 Contributing

Contributions are welcome! Areas for contribution:
- Additional content and examples
- Bug fixes
- UI/UX improvements
- Accessibility enhancements
- Performance optimizations
- Documentation improvements

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- shadcn/ui for component inspiration
- Mermaid.js for diagram rendering
- All the researchers and developers working on LLM memory systems

## 📞 Support

For questions, issues, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ for the LLM community**
