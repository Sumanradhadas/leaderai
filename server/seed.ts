import { dbStorage } from "./dbstorage";

async function seed() {
  console.log("Seeding database...");

  try {
    // Check if campaign already exists
    const existing = await dbStorage.getCampaignByName("John Mitchell");
    if (existing) {
      console.log("Campaign already exists, skipping seed");
      return existing.id;
    }

    // Create initial campaign
    const campaign = await dbStorage.createCampaign({
      leaderName: "John Mitchell",
      partyName: "Progressive Alliance Party",
      slogan: "Together, We Build Tomorrow",
      primaryColor: "#DC2626",
      secondaryColor: "#1E40AF",
      heroImage: "/attached_assets/generated_images/Political_leader_rally_hero_dd2155da.png",
      portraitImage: "/attached_assets/generated_images/Leader_professional_portrait_9ed1db7a.png",
      partyLogo: "/attached_assets/generated_images/Political_party_logo_b8f95c63.png",
      aboutMessage: `John Mitchell has dedicated his life to public service, fighting for working families and building a more equitable future for all Americans. With over 20 years of experience in public policy and community organizing, John understands the challenges facing everyday people.

His vision for America is one where opportunity is accessible to everyone, where healthcare is a right, not a privilege, and where we invest in our communities, our infrastructure, and our future. Join the movement to create lasting change.`,
      manifesto: `## Healthcare for All
We believe that healthcare is a fundamental right, not a privilege reserved for the wealthy. Our plan will ensure every American has access to quality, affordable healthcare without fear of bankruptcy.

## Economic Justice
Working families deserve a fair shot at the American Dream. We'll raise the minimum wage, strengthen unions, and create millions of good-paying jobs through infrastructure investment.

## Climate Action
The climate crisis demands urgent action. We'll transition to 100% clean energy by 2035, creating green jobs and protecting our planet for future generations.

## Education Investment
Every child deserves access to world-class education. We'll increase funding for public schools, make college debt-free, and invest in vocational training programs.`,
      tokens: 150,
    });

    console.log("Campaign created:", campaign.id);

    // Create templates
    const template1 = await dbStorage.createTemplate({
      campaignId: campaign.id,
      name: "Patriotic Frame",
      thumbnail: "/attached_assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png",
      mainImage: "/attached_assets/generated_images/Patriotic_frame_template_thumbnail_e9752e88.png",
      prompt: "Create a patriotic campaign photo frame with red, white, and blue colors, American flag elements, and inspiring political messaging",
    });

    const template2 = await dbStorage.createTemplate({
      campaignId: campaign.id,
      name: "Social Media",
      thumbnail: "/attached_assets/generated_images/Social_media_template_thumbnail_749ca1aa.png",
      mainImage: "/attached_assets/generated_images/Social_media_template_thumbnail_749ca1aa.png",
      prompt: "Generate a bold social media ready campaign graphic with modern design, campaign slogan overlay, and optimized for sharing",
    });

    const template3 = await dbStorage.createTemplate({
      campaignId: campaign.id,
      name: "Vintage Poster",
      thumbnail: "/attached_assets/generated_images/Vintage_poster_template_thumbnail_3b5023a2.png",
      mainImage: "/attached_assets/generated_images/Vintage_poster_template_thumbnail_3b5023a2.png",
      prompt: "Create a vintage-style political campaign poster with retro typography, classic Americana design elements, and nostalgic appeal",
    });

    console.log("Templates created:", [template1.id, template2.id, template3.id]);
    console.log("Seeding complete!");
    return campaign.id;
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seed };
