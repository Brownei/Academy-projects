import { useEffect, useState } from "react"
import { Card, CardContent } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { WalletConnect } from "~/components/wallet-connector"
import { VotingSection } from "~/components/voting-section"
import { ProposalCreation } from "~/components/proposal-creation"
import { Vote, Users, FileStack, Wallet } from "lucide-react"
import { useAccount, useReadContract, type Abi } from "@starknet-react/core"
import { ABI } from "~/lib/abi"
import TokensRequest from "~/components/tokens-request"
import { CONTRACT_ADDRESS } from "~/lib/constants"

export default function Welcome() {
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();
  const { data: readData, refetch: dataRefetch, isError: readIsError, isLoading: readIsLoading, error: readError } = useReadContract({
    functionName: "get_tokens",
    args: undefined,
    abi: ABI as Abi,
    address: address,
    watch: true,
    refetchInterval: 1000
  });

  useEffect(() => {
    dataRefetch()
  }, [balance])

  useEffect(() => {
    if (!readIsLoading && address) {
      const wei = parseInt(readData?.toString(), 32).toString().slice(0, 2);
      setBalance(Number(wei))
    } else if (readIsError) {
      setBalance(0)
    }
  }, [readIsError, readIsLoading, address])

  console.log({ readData: parseInt(readData?.toString(), 32), readIsError, readError })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-black text-center lg:text-left">
              VoteChain
            </h1>
            <p className="text-gray-600 text-center dark:text-gray-300 mt-2">Decentralized Voting & Prediction Platform</p>
          </div>
          <WalletConnect
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Votes</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Voters</p>
                  <p className="text-2xl font-bold">892</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileStack className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stake Amount Left</p>
                  <p className="text-2xl font-bold">{balance}</p>
                  <button
                    onClick={() => dataRefetch()}
                    className="mt-2 border border-black text-black font-regular py-1 px-3 bg-yellow-300 hover:bg-yellow-500"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Staked</p>
                  <p className="text-2xl font-bold">45.2 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="vote" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="cursor-pointer" value="vote">Vote</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="tokens">Get Stake Tokens</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="create">Create Proposal</TabsTrigger>
          </TabsList>

          <TabsContent value="vote">
            <VotingSection isConnected={!!address} />
          </TabsContent>

          <TabsContent value="create">
            <ProposalCreation isConnected={!!address} />
          </TabsContent>

          <TabsContent value="tokens">
            <TokensRequest isConnected={!!address} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
;
