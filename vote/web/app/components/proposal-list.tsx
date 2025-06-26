import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Input } from "./ui/input"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

interface ProposalsListProps {
  isConnected: boolean
}

const proposals = [
  {
    id: 1,
    title: "Alice will win the Developer of the Year award",
    description:
      "Betting on Alice Johnson winning the prestigious Developer of the Year award at the upcoming Web3 conference.",
    creator: "0x123...abc",
    totalStaked: "12.5 ETH",
    yesStake: "8.2 ETH",
    noStake: "4.3 ETH",
    yesPercentage: 66,
    endTime: "2024-02-15",
    status: "active",
  },
  {
    id: 2,
    title: "Bob will launch a successful DeFi protocol",
    description:
      "Prediction market on whether Bob Smith will successfully launch and maintain a DeFi protocol with >$1M TVL.",
    creator: "0x456...def",
    totalStaked: "8.7 ETH",
    yesStake: "3.1 ETH",
    noStake: "5.6 ETH",
    yesPercentage: 36,
    endTime: "2024-03-01",
    status: "active",
  },
  {
    id: 3,
    title: "Carol will become a Web3 unicorn founder",
    description:
      "Betting on Carol Davis founding a Web3 startup that reaches unicorn status ($1B+ valuation) within 2 years.",
    creator: "0x789...ghi",
    totalStaked: "15.3 ETH",
    yesStake: "7.8 ETH",
    noStake: "7.5 ETH",
    yesPercentage: 51,
    endTime: "2026-01-01",
    status: "active",
  },
]

export function ProposalsList({ isConnected }: ProposalsListProps) {
  const [betAmounts, setBetAmounts] = useState<{ [key: number]: string }>({})
  const [isBetting, setIsBetting] = useState(false)

  const handleBet = async (proposalId: number, side: "yes" | "no") => {
    if (!isConnected) return

    setIsBetting(true)
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsBetting(false)
      setBetAmounts((prev) => ({ ...prev, [proposalId]: "" }))
    }, 2000)
  }

  const updateBetAmount = (proposalId: number, amount: string) => {
    setBetAmounts((prev) => ({ ...prev, [proposalId]: amount }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Active Prediction Markets
          </CardTitle>
          <CardDescription>Bet on outcomes and earn rewards for correct predictions</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <CardDescription className="mt-2">{proposal.description}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Staked</p>
                  <p className="text-xl font-bold text-purple-600">{proposal.totalStaked}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">YES Pool</p>
                  <p className="text-lg font-semibold text-green-600">{proposal.yesStake}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">NO Pool</p>
                  <p className="text-lg font-semibold text-red-600">{proposal.noStake}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>YES: {proposal.yesPercentage}%</span>
                  <span>NO: {100 - proposal.yesPercentage}%</span>
                </div>
                <Progress value={proposal.yesPercentage} className="h-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Amount in ETH"
                    value={betAmounts[proposal.id] || ""}
                    onChange={(e) => updateBetAmount(proposal.id, e.target.value)}
                    disabled={!isConnected}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleBet(proposal.id, "yes")}
                    disabled={!isConnected || isBetting || !betAmounts[proposal.id]}
                    className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {isBetting ? "Betting..." : "Bet YES"}
                  </Button>
                  <Button
                    onClick={() => handleBet(proposal.id, "no")}
                    disabled={!isConnected || isBetting || !betAmounts[proposal.id]}
                    variant="destructive"
                    className="flex-1 sm:flex-none"
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    {isBetting ? "Betting..." : "Bet NO"}
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex justify-between">
                <span>Created by: {proposal.creator}</span>
                <span>Ends: {proposal.endTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isConnected && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
          <CardContent className="p-4">
            <p className="text-orange-800 dark:text-orange-200 text-center">
              Connect your wallet to participate in prediction markets
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

