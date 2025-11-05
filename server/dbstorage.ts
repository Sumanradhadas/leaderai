import { db } from "./db";
import { campaigns, templates, generationLogs, type Campaign, type InsertCampaign, type Template, type InsertTemplate, type GenerationLog, type InsertGenerationLog } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  async getCampaign(id: string): Promise<Campaign | undefined> {
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    return result[0];
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return await db.select().from(campaigns);
  }

  async getCampaignByName(leaderName: string): Promise<Campaign | undefined> {
    try {
      const result = await db.select().from(campaigns).where(eq(campaigns.leaderName, leaderName)).limit(1);
      return result?.[0];
    } catch (error) {
      // Handle Neon serverless adapter's empty result issue
      return undefined;
    }
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    await db.insert(campaigns).values(insertCampaign);
    const result = await db.select().from(campaigns).orderBy(desc(campaigns.id)).limit(1);
    if (!result || result.length === 0) {
      throw new Error("Failed to create campaign");
    }
    return result[0];
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    await db.update(campaigns).set(updates).where(eq(campaigns.id, id));
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    return result[0];
  }

  async getTemplates(campaignId: string): Promise<Template[]> {
    try {
      return await db.select().from(templates).where(eq(templates.campaignId, campaignId));
    } catch (error) {
      return [];
    }
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    await db.insert(templates).values(insertTemplate);
    const result = await db.select().from(templates).where(eq(templates.campaignId, insertTemplate.campaignId)).orderBy(desc(templates.id)).limit(1);
    if (!result || result.length === 0) {
      throw new Error("Failed to create template");
    }
    return result[0];
  }

  async deleteTemplate(id: string): Promise<boolean> {
    await db.delete(templates).where(eq(templates.id, id));
    return true;
  }

  async createGenerationLog(insertLog: InsertGenerationLog): Promise<GenerationLog> {
    await db.insert(generationLogs).values(insertLog);
    const result = await db.select().from(generationLogs).where(eq(generationLogs.campaignId, insertLog.campaignId)).orderBy(desc(generationLogs.timestamp)).limit(1);
    if (!result || result.length === 0) {
      throw new Error("Failed to create generation log");
    }
    return result[0];
  }

  async getGenerationLogs(campaignId: string): Promise<GenerationLog[]> {
    try {
      return await db.select().from(generationLogs).where(eq(generationLogs.campaignId, campaignId));
    } catch (error) {
      return [];
    }
  }
}

export const dbStorage = new DatabaseStorage();
