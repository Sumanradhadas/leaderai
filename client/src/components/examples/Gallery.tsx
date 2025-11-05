import Gallery from "../Gallery";
import template1 from "@assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png";
import template2 from "@assets/generated_images/Social_media_template_thumbnail_749ca1aa.png";
import template3 from "@assets/generated_images/Vintage_poster_template_thumbnail_3b5023a2.png";

export default function GalleryExample() {
  const examples = [template1, template2, template3, template1, template2, template3, template1, template2];
  
  return <Gallery examples={examples} />;
}
