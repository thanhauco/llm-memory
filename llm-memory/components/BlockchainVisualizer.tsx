"use client"

import { useState, useEffect } from "react"
import { Block as BlockType, createGenesisBlock, createBlock, generateRandomTransaction } from "@/lib/blockchain"
import { Block } from "./Block"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, RefreshCw, Trash2, Zap } from "lucide-react"

export function BlockchainVisualizer() {
  const [blocks, setBlocks] = useState<BlockType[]>([])
  const [isMining, setIsMining] = useState(false)

  // Initialize with genesis block
  useEffect(() => {
    setBlocks([createGenesisBlock()])
  }, [])

  const addBlock = async () => {
    if (blocks.length === 0) return
    
    setIsMining(true)
    
    // Simulate mining delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const transactions = [
      generateRandomTransaction(),
      generateRandomTransaction(),
      generateRandomTransaction()
    ]
    
    const newBlock = createBlock(blocks[blocks.length - 1], transactions, 1)
    setBlocks([...blocks, newBlock])
    
    setIsMining(false)
  }

  const resetChain = () => {
    setBlocks([createGenesisBlock()])
  }

  const addMultipleBlocks = async () => {
    if (blocks.length === 0) return
    
    setIsMining(true)
    let currentBlocks = [...blocks]
    
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const transactions = [
        generateRandomTransaction(),
        generateRandomTransaction()
      ]
      const newBlock = createBlock(currentBlocks[currentBlocks.length - 1], transactions, 1)
      currentBlocks = [...currentBlocks, newBlock]
      setBlocks([...currentBlocks])
    }
    
    setIsMining(false)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Controls</CardTitle>
          <CardDescription>
            Interact with the blockchain by adding new blocks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={addBlock}
              disabled={isMining || blocks.length === 0}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Block
            </Button>
            <Button
              onClick={addMultipleBlocks}
              disabled={isMining || blocks.length === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Add 3 Blocks
            </Button>
            <Button
              onClick={resetChain}
              disabled={isMining}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Chain
            </Button>
          </div>
          {isMining && (
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              Mining block...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{blocks.length}</div>
              <div className="text-sm text-muted-foreground">Total Blocks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {blocks.reduce((sum, block) => sum + block.transactions.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {blocks.reduce((sum, block) => sum + block.nonce, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Nonce</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Visualization */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Blockchain</h2>
        {blocks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No blocks in the chain. Click "Add Block" to start.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <div key={block.hash} className="relative">
                <Block
                  block={block}
                  isLatest={index === blocks.length - 1}
                />
                {index < blocks.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-0.5 h-6 bg-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
