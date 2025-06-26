import { Card, CardContent, CardHeader, } from "./ui/card"
import { Button } from "./ui/button"
import { useEffect, useMemo, type FC } from "react"
import LoadingState from "./loading-button-state"
import { useSendTransaction, useTransactionReceipt, useAccount, type Abi, useContract, useReadContract } from "@starknet-react/core"
import { CONTRACT_ADDRESS } from "~/lib/constants"
import { ABI } from "~/lib/abi"

interface TokensRequestProps {
  isConnected: boolean
}

const TokensRequest: FC<TokensRequestProps> = ({ isConnected }) => {
  const { address } = useAccount()
  const { refetch } = useReadContract({
    functionName: "get_staked_tokens_from_current_addr",
    args: undefined,
    abi: ABI as Abi,
    address: CONTRACT_ADDRESS,
    watch: true,
    refetchInterval: 1000
  });


  const handleSubmit = async () => {
    writeAsync();
  };
  const typedABI = ABI as Abi;
  const { contract } = useContract({
    abi: typedABI,
    address: CONTRACT_ADDRESS,
  });
  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return [contract.populate("stake_tokens")];
  }, [contract, address]);

  const {
    send: writeAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({
    calls,
  });
  const {
    data: waitData,
    status: waitStatus,
    isLoading: waitIsLoading,
    isError: waitIsError,
    error: waitError
  } = useTransactionReceipt({ hash: writeData?.transaction_hash, watch: true })

  console.log({ waitData, waitError })

  useEffect(() => {
    if (waitStatus === "success") {
      refetch()
    }
  }, [waitStatus])

  const buttonContent = () => {
    if (writeIsPending) {
      return <LoadingState message="Send..." />;
    }

    if (waitIsLoading) {
      return <LoadingState message="Waiting for confirmation..." />;
    }

    if (waitStatus === "error") {
      return "Transaction rejected...";
    }

    if (waitStatus === "success") {
      return "Transaction confirmed";
    }

    return "Get 10 STRK Stake Tokens";
  };

  return (
    <div className="w-full mx-auto">
      <Card className="flex justify-center items-center flex-col">
        <CardHeader className="w-full text-center font-bold">Request For Stake Tokens</CardHeader>
        <CardContent className="space-y-6">
          <Button onClick={async () => await handleSubmit()} disabled={!isConnected} className="cursor-pointer font-semibold">{buttonContent()}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default TokensRequest
