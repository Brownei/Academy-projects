import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Vote } from "lucide-react"

interface VotingSectionProps {
  isConnected: boolean
}

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Blockchain Developer & DeFi Expert",
    votes: 342,
    percentage: 45,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    description: "Smart Contract Auditor",
    votes: 287,
    percentage: 38,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Davis",
    description: "Web3 Product Manager",
    votes: 129,
    percentage: 17,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function VotingSection({ isConnected }: VotingSectionProps) {
  const [votedFor, setVotedFor] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (candidateId: number) => {
    if (!isConnected) return

    setIsVoting(true)
    // Simulate blockchain transaction
    setTimeout(() => {
      setVotedFor(candidateId)
      setIsVoting(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Vote for Community Leaders
          </CardTitle>
          <CardDescription>Cast your vote for the next community leader. Each wallet can vote once.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{candidate.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">{candidate.votes} votes</Badge>
                      <div className="flex items-center gap-2">
                        <Progress value={candidate.percentage} className="w-20" />
                        <span className="text-sm text-gray-600">{candidate.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {votedFor === candidate.id ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">Voted ✓</Badge>
                  ) : (
                    <Button
                      onClick={() => handleVote(candidate.id)}
                      disabled={!isConnected || isVoting || votedFor !== null}
                      variant={votedFor !== null ? "outline" : "default"}
                      className="bg-black hover:bg-black/80 cursor-pointer disabled:bg-black/90"
                    >
                      {isVoting ? "Voting..." : "Vote"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isConnected && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
          <CardContent className="p-4">
            <p className="text-orange-800 dark:text-orange-200 text-center">
              Connect your wallet to participate in voting
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

