import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2 } from "lucide-react";

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGenerating: boolean;
  generatedImage: string | null;
  suggestedCaption: string;
}

export default function GenerationModal({
  isOpen,
  onClose,
  isGenerating,
  generatedImage,
  suggestedCaption,
}: GenerationModalProps) {
  const handleDownload = () => {
    console.log("Download image");
  };

  const handleShare = () => {
    console.log("Share image");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" data-testid="modal-generation">
        <DialogHeader>
          <DialogTitle>
            {isGenerating ? "Generating Your Image..." : "Your Campaign Photo"}
          </DialogTitle>
        </DialogHeader>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Creating your personalized campaign photo...
            </p>
            <p className="text-sm text-muted-foreground">
              This will deduct 10 tokens from your balance
            </p>
          </div>
        ) : generatedImage ? (
          <div className="space-y-6">
            <img
              src={generatedImage}
              alt="Generated campaign photo"
              className="w-full rounded-md"
              data-testid="img-generated"
            />

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Suggested Caption:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                  {suggestedCaption}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handleShare}
                  variant="secondary"
                  className="flex-1"
                  data-testid="button-share"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
