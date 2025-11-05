import CampaignHero from "../CampaignHero";
import heroImage from "@assets/generated_images/Political_leader_rally_hero_dd2155da.png";

export default function CampaignHeroExample() {
  return (
    <CampaignHero
      leaderName="John Mitchell"
      partyName="Progressive Alliance Party"
      slogan="Together, We Build Tomorrow"
      heroImage={heroImage}
      onCtaClick={() => console.log("CTA clicked")}
    />
  );
}
