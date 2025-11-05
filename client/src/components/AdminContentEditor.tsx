import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";

interface CampaignContent {
  leaderName: string;
  partyName: string;
  slogan: string;
  aboutMessage: string;
  manifesto: string;
  primaryColor: string;
  secondaryColor: string;
}

interface AdminContentEditorProps {
  content: CampaignContent;
  onSave: (content: CampaignContent) => void;
}

export default function AdminContentEditor({
  content,
  onSave,
}: AdminContentEditorProps) {
  const [formData, setFormData] = useState(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    console.log("Content saved:", formData);
  };

  const handleChange = (field: keyof CampaignContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-content-editor-title">
          Content Editor
        </h1>
        <p className="text-muted-foreground">
          Update campaign information and branding
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="leader-name">Leader Name</Label>
              <Input
                id="leader-name"
                value={formData.leaderName}
                onChange={(e) => handleChange("leaderName", e.target.value)}
                data-testid="input-leader-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="party-name">Party Name</Label>
              <Input
                id="party-name"
                value={formData.partyName}
                onChange={(e) => handleChange("partyName", e.target.value)}
                data-testid="input-party-name"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="slogan">Campaign Slogan</Label>
              <Input
                id="slogan"
                value={formData.slogan}
                onChange={(e) => handleChange("slogan", e.target.value)}
                data-testid="input-slogan"
              />
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">Party Colors</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-4">
                <Input
                  id="primary-color"
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="w-20 h-10"
                  data-testid="input-primary-color"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  placeholder="#DC2626"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-4">
                <Input
                  id="secondary-color"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange("secondaryColor", e.target.value)}
                  className="w-20 h-10"
                  data-testid="input-secondary-color"
                />
                <Input
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange("secondaryColor", e.target.value)}
                  placeholder="#1E40AF"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">About Section</h3>
          <div className="space-y-2">
            <Label htmlFor="about-message">About Message</Label>
            <Textarea
              id="about-message"
              value={formData.aboutMessage}
              onChange={(e) => handleChange("aboutMessage", e.target.value)}
              rows={6}
              data-testid="input-about-message"
            />
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">Manifesto</h3>
          <div className="space-y-2">
            <Label htmlFor="manifesto">Vision & Policies</Label>
            <Textarea
              id="manifesto"
              value={formData.manifesto}
              onChange={(e) => handleChange("manifesto", e.target.value)}
              rows={12}
              data-testid="input-manifesto"
            />
            <p className="text-sm text-muted-foreground">
              Use ## for section headings. Separate sections with blank lines.
            </p>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" data-testid="button-save-content">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
