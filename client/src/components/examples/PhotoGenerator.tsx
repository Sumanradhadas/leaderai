import PhotoGenerator from "../PhotoGenerator";
import template1 from "@assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png";
import template2 from "@assets/generated_images/Social_media_template_thumbnail_749ca1aa.png";
import template3 from "@assets/generated_images/Vintage_poster_template_thumbnail_3b5023a2.png";

export default function PhotoGeneratorExample() {
  const templates = [
    { id: "1", name: "Patriotic Frame", thumbnail: template1 },
    { id: "2", name: "Social Media", thumbnail: template2 },
    { id: "3", name: "Vintage Poster", thumbnail: template3 },
  ];

  return (
    <PhotoGenerator
      templates={templates}
      tokensAvailable={150}
      onGenerate={(templateId, photo) => 
        console.log("Generate requested:", templateId, photo.name)
      }
    />
  );
}
