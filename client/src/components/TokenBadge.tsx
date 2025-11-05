import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TokenBadgeProps {
  tokens: number;
}

export default function TokenBadge({ tokens }: TokenBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className="fixed top-6 right-6 z-50 px-4 py-2 text-base font-semibold shadow-lg"
      data-testid="badge-token-count"
    >
      <Coins className="w-4 h-4 mr-2" />
      {tokens} Tokens Remaining
    </Badge>
  );
}
