import AdminTemplateManager from "../AdminTemplateManager";
import template1 from "@assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png";
import template2 from "@assets/generated_images/Social_media_template_thumbnail_749ca1aa.png";

export default function AdminTemplateManagerExample() {
  const templates = [
    {
      id: "1",
      name: "Patriotic Frame",
      thumbnail: template1,
      prompt: "Create patriotic campaign frame with red, white, and blue colors",
    },
    {
      id: "2",
      name: "Social Media",
      thumbnail: template2,
      prompt: "Generate social media ready campaign graphic with bold text",
    },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <AdminTemplateManager
        templates={templates}
        onAddTemplate={(template) => console.log("Add template:", template)}
        onDeleteTemplate={(id) => console.log("Delete template:", id)}
      />
    </div>
  );
}
