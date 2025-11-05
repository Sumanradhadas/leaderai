import { type Campaign, type InsertCampaign, type Template, type InsertTemplate, type GenerationLog, type InsertGenerationLog } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getCampaign(id: string): Promise<Campaign | undefined>;
  getAllCampaigns(): Promise<Campaign[]>;
  getCampaignByName(leaderName: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign | undefined>;
  
  getTemplates(campaignId: string): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  deleteTemplate(id: string): Promise<boolean>;
  
  createGenerationLog(log: InsertGenerationLog): Promise<GenerationLog>;
  getGenerationLogs(campaignId: string): Promise<GenerationLog[]>;
}

export class MemStorage implements IStorage {
  private campaigns: Map<string, Campaign>;
  private templates: Map<string, Template>;
  private logs: Map<string, GenerationLog>;

  constructor() {
    this.campaigns = new Map();
    this.templates = new Map();
    this.logs = new Map();
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaignByName(leaderName: string): Promise<Campaign | undefined> {
    return Array.from(this.campaigns.values()).find(
      (campaign) => campaign.leaderName === leaderName,
    );
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = { 
      tokens: 0,
      primaryColor: "#DC2626",
      secondaryColor: "#1E40AF",
      ...insertCampaign, 
      id,
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updated = { ...campaign, ...updates };
    this.campaigns.set(id, updated);
    return updated;
  }

  async getTemplates(campaignId: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.campaignId === campaignId,
    );
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = randomUUID();
    const template: Template = { ...insertTemplate, id };
    this.templates.set(id, template);
    return template;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }

  async createGenerationLog(insertLog: InsertGenerationLog): Promise<GenerationLog> {
    const id = randomUUID();
    const log: GenerationLog = { 
      tokensUsed: 10,
      ...insertLog, 
      id,
      timestamp: new Date(),
    };
    this.logs.set(id, log);
    return log;
  }

  async getGenerationLogs(campaignId: string): Promise<GenerationLog[]> {
    return Array.from(this.logs.values())
      .filter((log) => log.campaignId === campaignId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

// Use database storage in production, memory storage for development if needed
import { dbStorage } from "./dbstorage";
export const storage = process.env.DATABASE_URL ? dbStorage : new MemStorage();
