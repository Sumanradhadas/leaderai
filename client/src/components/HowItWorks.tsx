import { Upload, Image, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Photo",
      description: "Choose a clear photo of yourself that you'd like to use in your campaign image.",
    },
    {
      icon: Image,
      title: "Select a Template",
      description: "Pick from our collection of professionally designed campaign templates.",
    },
    {
      icon: Share2,
      title: "Generate & Share",
      description: "Our AI creates your personalized image. Download and share it on social media!",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your campaign photo in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 text-center space-y-4" data-testid={`card-step-${index + 1}`}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-black text-primary/20">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
