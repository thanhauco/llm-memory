"use client"

import { Block as BlockType } from "@/lib/blockchain"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, Clock, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockProps {
  block: BlockType
  isLatest?: boolean
  className?: string
}

export function Block({ block, isLatest = false, className }: BlockProps) {
  return (
    <Card
      className={cn(
        "relative transition-all duration-300",
        isLatest && "ring-2 ring-primary ring-offset-2 animate-pulse",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span className="font-bold text-lg">Block #{block.index}</span>
          </div>
          {isLatest && (
            <Badge variant="default" className="animate-pulse">
              Latest
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hash */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>Hash</span>
          </div>
          <div className="font-mono text-xs bg-muted p-2 rounded break-all">
            {block.hash}
          </div>
        </div>

        {/* Previous Hash */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>Previous Hash</span>
          </div>
          <div className="font-mono text-xs bg-muted p-2 rounded break-all">
            {block.previousHash}
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">
            {new Date(block.timestamp).toLocaleTimeString()}
          </span>
        </div>

        {/* Transactions */}
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            Transactions ({block.transactions.length})
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {block.transactions.map((tx) => (
              <div
                key={tx.id}
                className="text-xs bg-muted/50 p-2 rounded border-l-2 border-primary"
              >
                <div className="font-semibold">{tx.from} → {tx.to}</div>
                <div className="text-muted-foreground">
                  {tx.amount} coins
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nonce */}
        <div className="text-xs text-muted-foreground">
          Nonce: {block.nonce}
        </div>
      </CardContent>
    </Card>
  )
}
