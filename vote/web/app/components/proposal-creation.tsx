import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"

interface ProposalCreationProps {
  isConnected: boolean
}

export function ProposalCreation({ isConnected }: ProposalCreationProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [endDate, setEndDate] = useState<Date>()
  const [initialStake, setInitialStake] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateProposal = async () => {
    if (!isConnected) return

    setIsCreating(true)
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsCreating(false)
      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setEndDate(undefined)
      setInitialStake("")
      alert("Proposal created successfully!")
    }, 3000)
  }

  const isFormValid = title && description && category && endDate && initialStake

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Proposal
          </CardTitle>
          <CardDescription>
            Create a prediction market for others to bet on. You'll need to provide initial liquidity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Alice will win the Developer of the Year award"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isConnected}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about what you're predicting..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isConnected}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={!isConnected}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="career">Career Achievement</SelectItem>
                  <SelectItem value="business">Business Success</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="awards">Awards & Recognition</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={!isConnected}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stake">Initial Stake (ETH)</Label>
            <Input
              id="stake"
              type="number"
              placeholder="0.1"
              value={initialStake}
              onChange={(e) => setInitialStake(e.target.value)}
              disabled={!isConnected}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You'll provide initial liquidity to bootstrap the market
            </p>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={handleCreateProposal}
              disabled={!isConnected || !isFormValid || isCreating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="lg"
            >
              {isCreating ? "Creating Proposal..." : "Create Proposal"}
            </Button>
          </div>

          {!isConnected && (
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
              <CardContent className="p-4">
                <p className="text-orange-800 dark:text-orange-200 text-center">
                  Connect your wallet to create proposals
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

