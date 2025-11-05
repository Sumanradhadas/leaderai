import AboutSection from "../AboutSection";
import portraitImage from "@assets/generated_images/Leader_professional_portrait_9ed1db7a.png";
import partyLogo from "@assets/generated_images/Political_party_logo_b8f95c63.png";

export default function AboutSectionExample() {
  return (
    <AboutSection
      leaderName="John Mitchell"
      partyName="Progressive Alliance Party"
      portraitImage={portraitImage}
      partyLogo={partyLogo}
      aboutMessage="John Mitchell has dedicated his life to public service, fighting for working families and building a more equitable future for all Americans. With over 20 years of experience in public policy and community organizing, John understands the challenges facing everyday people.

His vision for America is one where opportunity is accessible to everyone, where healthcare is a right, not a privilege, and where we invest in our communities, our infrastructure, and our future. Join the movement to create lasting change."
    />
  );
}
