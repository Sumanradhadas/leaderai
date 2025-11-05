import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
}

interface PhotoGeneratorProps {
  templates: Template[];
  tokensAvailable: number;
  onGenerate: (templateId: string, userPhoto: File) => void;
}

export default function PhotoGenerator({
  templates,
  tokensAvailable,
  onGenerate,
}: PhotoGeneratorProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
      console.log("Photo uploaded:", file.name);
    }
  };

  const handleGenerate = () => {
    if (uploadedPhoto && selectedTemplate) {
      onGenerate(selectedTemplate, uploadedPhoto);
      console.log("Generating image with template:", selectedTemplate);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="generator">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" data-testid="text-generator-title">
            Create Your Campaign Photo
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload your photo and choose a template to generate your personalized campaign image
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4">Step 1: Upload Your Photo</h3>
            <div className="border-2 border-dashed border-border rounded-md p-12 text-center hover-elevate">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                data-testid="input-photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-md"
                      data-testid="img-photo-preview"
                    />
                    <p className="text-sm text-muted-foreground">Click to change photo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold">Click to upload your photo</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </Card>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4">Step 2: Choose a Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    console.log("Template selected:", template.name);
                  }}
                  className={`relative rounded-md overflow-hidden hover-elevate active-elevate-2 ${
                    selectedTemplate === template.id ? "ring-4 ring-primary" : ""
                  }`}
                  data-testid={`button-template-${template.id}`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white font-semibold p-3 text-sm">
                      {template.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!uploadedPhoto || !selectedTemplate || tokensAvailable < 10}
              className="px-8 py-6 text-lg"
              data-testid="button-generate"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Image (10 Tokens)
            </Button>
            {tokensAvailable < 10 && (
              <p className="text-sm text-destructive mt-2">
                Insufficient tokens. Contact campaign organizer.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
