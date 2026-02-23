// Blockchain types and utilities

export interface Transaction {
  id: string
  from: string
  to: string
  amount: number
  timestamp: number
}

export interface Block {
  index: number
  timestamp: number
  transactions: Transaction[]
  previousHash: string
  hash: string
  nonce: number
}

// Simple hash function (for demo purposes)
export function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// Calculate block hash
export function calculateHash(block: Omit<Block, 'hash'>): string {
  const data = `${block.index}${block.timestamp}${JSON.stringify(block.transactions)}${block.previousHash}${block.nonce}`
  return simpleHash(data)
}

// Create genesis block
export function createGenesisBlock(): Block {
  const block: Omit<Block, 'hash'> = {
    index: 0,
    timestamp: Date.now(),
    transactions: [{
      id: 'genesis-0',
      from: 'System',
      to: 'Genesis',
      amount: 0,
      timestamp: Date.now()
    }],
    previousHash: '0',
    nonce: 0
  }
  
  return {
    ...block,
    hash: calculateHash(block)
  }
}

// Create a new block
export function createBlock(
  previousBlock: Block,
  transactions: Transaction[],
  difficulty: number = 0
): Block {
  const block: Omit<Block, 'hash'> = {
    index: previousBlock.index + 1,
    timestamp: Date.now(),
    transactions,
    previousHash: previousBlock.hash,
    nonce: 0
  }

  // Simple proof of work (for demo)
  let hash = calculateHash(block)
  while (difficulty > 0 && !hash.startsWith('0'.repeat(difficulty))) {
    block.nonce++
    hash = calculateHash(block)
  }

  return {
    ...block,
    hash
  }
}

// Generate random transaction
export function generateRandomTransaction(): Transaction {
  const addresses = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const from = addresses[Math.floor(Math.random() * addresses.length)]
  let to = addresses[Math.floor(Math.random() * addresses.length)]
  while (to === from) {
    to = addresses[Math.floor(Math.random() * addresses.length)]
  }
  
  return {
    id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    from,
    to,
    amount: Math.floor(Math.random() * 1000) + 1,
    timestamp: Date.now()
  }
}
