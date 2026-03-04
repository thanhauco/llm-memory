"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

interface DiagramProps {
  chart: string
  title?: string
}

export function Diagram({ chart, title }: DiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!diagramRef.current || !isMounted) return

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    diagramRef.current.id = id
    diagramRef.current.textContent = chart

    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    })

    mermaid.run({
      nodes: [diagramRef.current],
    }).catch((err) => {
      console.error("Mermaid rendering error:", err)
    })
  }, [chart, isMounted])

  if (!isMounted) {
    return (
      <div className="my-6 rounded-lg border border-border p-4 bg-card">
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
        )}
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Loading diagram...
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 rounded-lg border border-border p-4 bg-card overflow-x-auto">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <div ref={diagramRef} className="mermaid flex justify-center">
        {chart}
      </div>
    </div>
  )
}
