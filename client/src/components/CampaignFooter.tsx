import { Facebook, Twitter, Instagram, Youtube, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CampaignFooterProps {
  leaderName: string;
  partyName: string;
  partyLogo: string;
  tokensRemaining?: number;
}

export default function CampaignFooter({
  leaderName,
  partyName,
  partyLogo,
  tokensRemaining,
}: CampaignFooterProps) {
  return (
    <footer className="bg-card border-t border-card-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <img
              src={partyLogo}
              alt={partyName}
              className="h-16 w-auto"
              data-testid="img-footer-logo"
            />
            <p className="text-sm text-muted-foreground">
              {leaderName} for America
            </p>
            {tokensRemaining !== undefined && (
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm font-semibold"
                data-testid="badge-footer-tokens"
              >
                <Coins className="w-4 h-4 mr-2" />
                {tokensRemaining} Tokens Remaining
              </Badge>
            )}
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground" data-testid="link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-foreground" data-testid="link-manifesto">
                  Our Vision
                </a>
              </li>
              <li>
                <a href="#generator" className="hover:text-foreground" data-testid="link-generator">
                  Create Photo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate"
                data-testid="link-youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 {partyName}. All rights reserved.</p>
          <p className="mt-2">Powered by Campaign Hub</p>
        </div>
      </div>
    </footer>
  );
}
