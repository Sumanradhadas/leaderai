import CampaignFooter from "../CampaignFooter";
import partyLogo from "@assets/generated_images/Political_party_logo_b8f95c63.png";

export default function CampaignFooterExample() {
  return (
    <CampaignFooter
      leaderName="John Mitchell"
      partyName="Progressive Alliance Party"
      partyLogo={partyLogo}
      tokensRemaining={150}
    />
  );
}
