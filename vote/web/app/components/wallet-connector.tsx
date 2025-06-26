import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { LogOut } from "lucide-react"
import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';

export function WalletConnect() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Connected
        </Badge>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {connectors.length === 0 ? (
        <>
          Please download a wallet
        </>
      ) : (
        <>
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              className="bg-black hover:bg-black/80 text-white capitalize font-semibold"
            >
              <img className="size-[25px] rounded-full" src={`${connector.id === "braavos" ? "../../public/bravoos.jpeg" : "../../public/ready.png"}`} />
              Connect {connector.id}
            </Button>
          ))}
        </>
      )}
    </div>)
}

