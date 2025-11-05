import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Coins, Settings } from "lucide-react";

interface AdminTokenManagerProps {
  currentTokens: number;
  onUpdateTokens: (amount: number, operation: 'add' | 'subtract' | 'set') => void;
}

export default function AdminTokenManager({
  currentTokens,
  onUpdateTokens,
}: AdminTokenManagerProps) {
  const [addAmount, setAddAmount] = useState("");
  const [subtractAmount, setSubtractAmount] = useState("");
  const [exactAmount, setExactAmount] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(addAmount);
    if (amount > 0) {
      onUpdateTokens(amount, 'add');
      setAddAmount("");
    }
  };

  const handleSubtract = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(subtractAmount);
    if (amount > 0) {
      onUpdateTokens(amount, 'subtract');
      setSubtractAmount("");
    }
  };

  const handleSetExact = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(exactAmount);
    if (amount >= 0) {
      onUpdateTokens(amount, 'set');
      setExactAmount("");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-token-manager-title">
          Token Management
        </h1>
        <p className="text-muted-foreground">
          Manage token balance for your campaign site
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Coins className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-4xl font-bold" data-testid="text-current-tokens">
                  {currentTokens}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Each image generation costs 10 tokens. Current balance allows for{" "}
              {Math.floor(currentTokens / 10)} more generations.
            </p>
          </div>
        </Card>

        <Card className="p-8">
          <Tabs defaultValue="add" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="add">Add</TabsTrigger>
              <TabsTrigger value="subtract">Subtract</TabsTrigger>
              <TabsTrigger value="set">Set Exact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="add">
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="add-amount">Amount to Add</Label>
                  <Input
                    id="add-amount"
                    type="number"
                    min="1"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="Enter amount"
                    data-testid="input-add-amount"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-add-tokens">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tokens
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="subtract">
              <form onSubmit={handleSubtract} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="subtract-amount">Amount to Subtract</Label>
                  <Input
                    id="subtract-amount"
                    type="number"
                    min="1"
                    max={currentTokens}
                    value={subtractAmount}
                    onChange={(e) => setSubtractAmount(e.target.value)}
                    placeholder="Enter amount"
                    data-testid="input-subtract-amount"
                  />
                </div>
                <Button type="submit" variant="destructive" className="w-full" data-testid="button-subtract-tokens">
                  <Minus className="w-4 h-4 mr-2" />
                  Subtract Tokens
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="set">
              <form onSubmit={handleSetExact} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="exact-amount">Set Exact Amount</Label>
                  <Input
                    id="exact-amount"
                    type="number"
                    min="0"
                    value={exactAmount}
                    onChange={(e) => setExactAmount(e.target.value)}
                    placeholder="Enter exact amount"
                    data-testid="input-exact-amount"
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full" data-testid="button-set-tokens">
                  <Settings className="w-4 h-4 mr-2" />
                  Set Token Balance
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
