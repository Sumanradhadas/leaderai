import { Card } from "@/components/ui/card";

interface GalleryProps {
  examples: string[];
}

export default function Gallery({ examples }: GalleryProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" data-testid="text-gallery-title">
            Community Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            See what supporters have created
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {examples.map((image, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover-elevate group"
              data-testid={`card-gallery-${index}`}
            >
              <img
                src={image}
                alt={`Example ${index + 1}`}
                className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
