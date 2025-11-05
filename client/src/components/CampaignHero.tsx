import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface CampaignHeroProps {
  leaderName: string;
  partyName: string;
  slogan: string;
  heroImage: string;
  onCtaClick: () => void;
}

export default function CampaignHero({
  leaderName,
  partyName,
  slogan,
  heroImage,
  onCtaClick,
}: CampaignHeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="mb-6">
          <p className="text-xl lg:text-2xl font-semibold tracking-wide opacity-90" data-testid="text-party-name">
            {partyName}
          </p>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8" data-testid="text-leader-name">
          {leaderName}
        </h1>
        
        <p className="text-2xl lg:text-4xl font-bold mb-12 opacity-95" data-testid="text-slogan">
          {slogan}
        </p>
        
        <Button
          size="lg"
          variant="default"
          onClick={onCtaClick}
          className="px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20"
          data-testid="button-create-photo"
        >
          Create Your {leaderName.split(" ")[0]} Photo
        </Button>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
    </section>
  );
}
