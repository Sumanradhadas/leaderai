import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { Campaign, Template, GenerationLog } from "@shared/schema";
import multer from "multer";
import * as fs from "fs";
import { GoogleGenAI, Modality } from "@google/genai";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Campaign routes
  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getAllCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const updated = await storage.updateCampaign(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const campaign = await storage.createCampaign(req.body);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  // Template routes
  app.get("/api/templates/:campaignId", async (req, res) => {
    try {
      const templates = await storage.getTemplates(req.params.campaignId);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const template = await storage.createTemplate(req.body);
      res.status(201).json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTemplate(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete template" });
    }
  });

  // Generation logs routes
  app.get("/api/logs/:campaignId", async (req, res) => {
    try {
      const logs = await storage.getGenerationLogs(req.params.campaignId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  app.post("/api/logs", async (req, res) => {
    try {
      const log = await storage.createGenerationLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ error: "Failed to create log" });
    }
  });

  // Token management
  app.patch("/api/campaigns/:id/tokens", async (req, res) => {
    try {
      const { amount } = req.body;

      // Validate amount
      if (typeof amount !== 'number' || isNaN(amount)) {
        return res.status(400).json({ error: "Amount must be a valid number" });
      }

      const campaign = await storage.getCampaign(req.params.id);
      
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }

      const newTokenCount = campaign.tokens + amount;
      if (newTokenCount < 0) {
        return res.status(400).json({ error: "Insufficient tokens" });
      }

      const updated = await storage.updateCampaign(req.params.id, {
        tokens: newTokenCount,
      });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update tokens" });
    }
  });

  // Image generation route
  app.post("/api/generate", upload.single("photo"), async (req, res) => {
    try {
      const { campaignId, templateId } = req.body;
      const photoFile = req.file;

      // Validate request
      if (!campaignId || !templateId) {
        return res.status(400).json({ error: "Campaign ID and Template ID are required" });
      }

      if (!photoFile) {
        return res.status(400).json({ error: "No photo uploaded" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      // Get campaign and template
      const campaign = await storage.getCampaign(campaignId);
      const templates = await storage.getTemplates(campaignId);
      const template = templates.find((t) => t.id === templateId);

      if (!campaign || !template) {
        return res.status(404).json({ error: "Campaign or template not found" });
      }

      // Check if enough tokens
      if (campaign.tokens < 10) {
        return res.status(400).json({ error: "Insufficient tokens" });
      }

      // Generate image with Gemini, including the uploaded photo
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `${template.prompt}. Blend and incorporate the user's photo provided below into the campaign design.`;
      
      const imageDir = "./attached_assets/generated_images";
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      const imagePath = `${imageDir}/generated_${Date.now()}.png`;

      // Include the uploaded photo in the request
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: [{
          role: "user",
          parts: [
            {
              inlineData: {
                data: photoFile.buffer.toString("base64"),
                mimeType: photoFile.mimetype,
              },
            },
            { text: prompt },
          ],
        }],
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      const candidates = response.candidates;
      if (!candidates || candidates.length === 0) {
        return res.status(500).json({ error: "Failed to generate image" });
      }

      const content = candidates[0].content;
      if (!content || !content.parts) {
        return res.status(500).json({ error: "No content in response" });
      }

      let savedImagePath = "";
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const imageData = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(imagePath, imageData);
          savedImagePath = imagePath;
          break;
        }
      }

      if (!savedImagePath) {
        return res.status(500).json({ error: "No image data in response" });
      }

      // Deduct tokens
      await storage.updateCampaign(campaignId, {
        tokens: campaign.tokens - 10,
      });

      // Log generation
      await storage.createGenerationLog({
        campaignId,
        templateId,
        templateName: template.name,
        tokensUsed: 10,
      });

      res.json({
        success: true,
        imagePath: savedImagePath.replace("./", "/"),
        tokensRemaining: campaign.tokens - 10,
      });
    } catch (error: any) {
      console.error("Image generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
