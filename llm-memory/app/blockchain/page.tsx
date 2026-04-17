import { BlockchainVisualizer } from "@/components/BlockchainVisualizer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, Shield, Network } from "lucide-react"

export default function BlockchainPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Blockchain Visualizer</h1>
        <p className="text-lg text-muted-foreground">
          Interactive demonstration of how a blockchain works. Watch blocks get added to the chain,
          see transactions, hashes, and the cryptographic links between blocks.
        </p>
      </div>

      {/* Key Concepts */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Linked Blocks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Each block contains a hash of the previous block, creating an immutable chain.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Cryptographic Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Blocks are secured using cryptographic hashing. Any change invalidates the chain.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Distributed Ledger</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              The blockchain acts as a distributed ledger recording all transactions.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Visualizer */}
      <BlockchainVisualizer />

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Genesis Block</h3>
            <p className="text-sm text-muted-foreground">
              The first block in the chain has no previous block, so its previous hash is "0".
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">2. Adding Blocks</h3>
            <p className="text-sm text-muted-foreground">
              When you add a new block, it includes transactions and references the previous block's hash.
              The block is "mined" by finding a nonce that produces a hash starting with zeros (proof of work).
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">3. Chain Integrity</h3>
            <p className="text-sm text-muted-foreground">
              If any block is modified, its hash changes, breaking the chain. This makes the blockchain
              tamper-evident and secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
