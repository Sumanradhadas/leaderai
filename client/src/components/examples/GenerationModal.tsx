import { useState } from "react";
import GenerationModal from "../GenerationModal";
import { Button } from "@/components/ui/button";
import exampleImage from "@assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png";

export default function GenerationModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Generation Modal
      </Button>
      <GenerationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isGenerating={false}
        generatedImage={exampleImage}
        suggestedCaption="Proud to support John Mitchell for America! Together, we're building a brighter future for all. #Mitchell2024 #ProgressiveAlliance #VoteForChange"
      />
    </div>
  );
}
