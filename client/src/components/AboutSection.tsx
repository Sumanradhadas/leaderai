import { Card } from "@/components/ui/card";

interface AboutSectionProps {
  leaderName: string;
  partyName: string;
  portraitImage: string;
  partyLogo: string;
  aboutMessage: string;
}

export default function AboutSection({
  leaderName,
  partyName,
  portraitImage,
  partyLogo,
  aboutMessage,
}: AboutSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-background" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[2fr,3fr] gap-12 items-center">
          <div className="space-y-6">
            <img
              src={portraitImage}
              alt={leaderName}
              className="w-full rounded-md shadow-lg"
              data-testid="img-leader-portrait"
            />
            <div className="flex justify-center">
              <img
                src={partyLogo}
                alt={partyName}
                className="h-24 w-auto"
                data-testid="img-party-logo"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold" data-testid="text-about-title">
              About {leaderName}
            </h2>
            <div className="prose prose-lg max-w-none" data-testid="text-about-message">
              {aboutMessage.split('\n').map((paragraph, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
