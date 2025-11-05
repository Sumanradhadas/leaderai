import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload } from "lucide-react";

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  prompt: string;
}

interface AdminTemplateManagerProps {
  templates: Template[];
  onAddTemplate: (template: Omit<Template, "id">) => void;
  onDeleteTemplate: (id: string) => void;
}

export default function AdminTemplateManager({
  templates,
  onAddTemplate,
  onDeleteTemplate,
}: AdminTemplateManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    thumbnail: "",
    prompt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTemplate.name && newTemplate.prompt) {
      onAddTemplate(newTemplate);
      setNewTemplate({ name: "", thumbnail: "", prompt: "" });
      setIsAdding(false);
      console.log("Template added:", newTemplate);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-template-manager-title">
            Template Manager
          </h1>
          <p className="text-muted-foreground">
            Manage campaign photo templates
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          data-testid="button-add-template"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Template
        </Button>
      </div>

      {isAdding && (
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold">New Template</h3>
            
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
                placeholder="e.g., Patriotic Frame"
                data-testid="input-template-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-thumbnail">Thumbnail URL</Label>
              <Input
                id="template-thumbnail"
                value={newTemplate.thumbnail}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, thumbnail: e.target.value })
                }
                placeholder="https://..."
                data-testid="input-template-thumbnail"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-prompt">Generation Prompt</Label>
              <Textarea
                id="template-prompt"
                value={newTemplate.prompt}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, prompt: e.target.value })
                }
                rows={4}
                placeholder="Describe how the AI should generate the image..."
                data-testid="input-template-prompt"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" data-testid="button-save-template">
                Save Template
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAdding(false)}
                data-testid="button-cancel-template"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="p-6 space-y-4" data-testid={`card-template-${template.id}`}>
            {template.thumbnail && (
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full aspect-square object-cover rounded-md"
              />
            )}
            <div>
              <h3 className="font-bold text-lg">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {template.prompt}
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDeleteTemplate(template.id);
                console.log("Delete template:", template.id);
              }}
              className="w-full"
              data-testid={`button-delete-${template.id}`}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
