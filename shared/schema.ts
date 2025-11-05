import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leaderName: text("leader_name").notNull(),
  partyName: text("party_name").notNull(),
  slogan: text("slogan").notNull(),
  primaryColor: text("primary_color").notNull().default("#DC2626"),
  secondaryColor: text("secondary_color").notNull().default("#1E40AF"),
  heroImage: text("hero_image").notNull(),
  portraitImage: text("portrait_image").notNull(),
  partyLogo: text("party_logo").notNull(),
  aboutMessage: text("about_message").notNull(),
  manifesto: text("manifesto").notNull(),
  tokens: integer("tokens").notNull().default(0),
});

export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull(),
  name: text("name").notNull(),
  thumbnail: text("thumbnail").notNull(),
  mainImage: text("main_image").notNull(),
  prompt: text("prompt").notNull(),
});

export const generationLogs = pgTable("generation_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").notNull(),
  templateId: varchar("template_id").notNull(),
  templateName: text("template_name").notNull(),
  tokensUsed: integer("tokens_used").notNull().default(10),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({ id: true });
export const insertTemplateSchema = createInsertSchema(templates).omit({ id: true });
export const insertGenerationLogSchema = createInsertSchema(generationLogs).omit({ id: true, timestamp: true });

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertGenerationLog = z.infer<typeof insertGenerationLogSchema>;
export type GenerationLog = typeof generationLogs.$inferSelect;
