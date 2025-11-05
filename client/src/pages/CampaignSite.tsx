import { useState, useEffect } from "react";
import CampaignHero from "@/components/CampaignHero";
import AboutSection from "@/components/AboutSection";
import PhotoGenerator from "@/components/PhotoGenerator";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Manifesto from "@/components/Manifesto";
import CampaignFooter from "@/components/CampaignFooter";
import GenerationModal from "@/components/GenerationModal";
import type { Campaign, Template } from "@shared/schema";

export default function CampaignSite() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [tokens, setTokens] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch campaign data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch first available campaign
        const campaignsRes = await fetch('/api/campaigns');
        const campaignsData = await campaignsRes.json();
        
        if (!campaignsData || campaignsData.length === 0) {
          console.error("No campaigns available");
          setLoading(false);
          return;
        }

        const campaignData = campaignsData[0];
        setCampaign(campaignData);
        setTokens(campaignData.tokens);

        const templatesRes = await fetch(`/api/templates/${campaignData.id}`);
        const templatesData = await templatesRes.json();
        setTemplates(templatesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCtaClick = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerate = async (templateId: string, userPhoto: File) => {
    if (!campaign) return;
    
    setIsGenerating(true);
    setShowModal(true);

    try {
      const formData = new FormData();
      formData.append("photo", userPhoto);
      formData.append("campaignId", campaign.id);
      formData.append("templateId", templateId);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setIsGenerating(false);
        setGeneratedImage(result.imagePath);
        setTokens(result.tokensRemaining);
      } else {
        setIsGenerating(false);
        alert(result.error || "Failed to generate image");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
      alert("Failed to generate image. Please try again.");
      setShowModal(false);
    }
  };

  if (loading || !campaign) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const examples = templates.flatMap(t => [t.thumbnail, t.thumbnail]);

  return (
    <div className="min-h-screen bg-background">
      <CampaignHero
        leaderName={campaign.leaderName}
        partyName={campaign.partyName}
        slogan={campaign.slogan}
        heroImage={campaign.heroImage}
        onCtaClick={handleCtaClick}
      />
      
      <AboutSection
        leaderName={campaign.leaderName}
        partyName={campaign.partyName}
        portraitImage={campaign.portraitImage}
        partyLogo={campaign.partyLogo}
        aboutMessage={campaign.aboutMessage}
      />
      
      <HowItWorks />
      
      <PhotoGenerator
        templates={templates.map(t => ({ id: t.id, name: t.name, thumbnail: t.thumbnail }))}
        tokensAvailable={tokens}
        onGenerate={handleGenerate}
      />
      
      <Gallery examples={examples} />
      
      <Manifesto
        leaderName={campaign.leaderName}
        manifesto={campaign.manifesto}
      />
      
      <CampaignFooter
        leaderName={campaign.leaderName}
        partyName={campaign.partyName}
        partyLogo={campaign.partyLogo}
        tokensRemaining={tokens}
      />
      
      <GenerationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isGenerating={isGenerating}
        generatedImage={generatedImage}
        suggestedCaption={`Proud to support ${campaign.leaderName} for America! Together, we're building a brighter future for all. #Mitchell2025 #ProgressiveAlliance #VoteForChange`}
      />
    </div>
  );
}
