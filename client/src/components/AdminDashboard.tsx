import { Card } from "@/components/ui/card";
import { Coins, Image, TrendingUp, Users } from "lucide-react";

interface AdminDashboardProps {
  totalTokens: number;
  usedTokens: number;
  totalGenerations: number;
  popularTemplate: string;
}

export default function AdminDashboard({
  totalTokens,
  usedTokens,
  totalGenerations,
  popularTemplate,
}: AdminDashboardProps) {
  const remainingTokens = totalTokens - usedTokens;
  const usagePercentage = (usedTokens / totalTokens) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-title">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor your campaign performance and token usage
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6" data-testid="card-tokens-remaining">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Tokens Remaining
            </h3>
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{remainingTokens}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {usagePercentage.toFixed(1)}% used
          </p>
        </Card>

        <Card className="p-6" data-testid="card-total-generations">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Total Generations
            </h3>
            <Image className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{totalGenerations}</p>
          <p className="text-sm text-muted-foreground mt-2">
            All time
          </p>
        </Card>

        <Card className="p-6" data-testid="card-tokens-used">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Tokens Used
            </h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">{usedTokens}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {totalGenerations} images
          </p>
        </Card>

        <Card className="p-6" data-testid="card-popular-template">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Popular Template
            </h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xl font-bold">{popularTemplate}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Most used
          </p>
        </Card>
      </div>
    </div>
  );
}
