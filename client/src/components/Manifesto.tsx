import { Card } from "@/components/ui/card";

interface ManifestoProps {
  leaderName: string;
  manifesto: string;
}

export default function Manifesto({ leaderName, manifesto }: ManifestoProps) {
  const sections = manifesto.split('\n\n');

  return (
    <section className="py-16 lg:py-24 bg-background" id="manifesto">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" data-testid="text-manifesto-title">
            {leaderName}'s Vision for America
          </h2>
          <p className="text-lg text-muted-foreground">
            Our commitment to building a better future together
          </p>
        </div>

        <Card className="p-8 lg:p-12">
          <div className="prose prose-lg max-w-none space-y-6" data-testid="text-manifesto-content">
            {sections.map((section, index) => {
              const lines = section.split('\n');
              const isHeading = lines[0].startsWith('##');
              
              if (isHeading) {
                return (
                  <div key={index} className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                      {lines[0].replace('## ', '')}
                    </h3>
                    {lines.slice(1).map((line, i) => (
                      <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              
              return (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {section}
                </p>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
