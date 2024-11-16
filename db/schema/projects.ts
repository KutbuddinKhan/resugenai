import { integer, pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projectTable = pgTable("projects", {
  id: serial("id").notNull().primaryKey(),
  docId: integer("document_id").references(() => documentTable.id, {
    onDelete: "cascade",
  }).notNull(),
  projectName: varchar("project_name", { length: 255 }),
  projectLink: varchar("project_link", { length: 500 }),
  description: text("description"),
  technologies: varchar("technologies", { length: 500 }),
});

export const projectRelations = relations(projectTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [projectTable.docId],
    references: [documentTable.id],
  }),
}));

export const projectTableSchema = createInsertSchema(projectTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  projectName: true,
  projectLink: true,
  description: true,
  technologies: true,
});

export type ProjectSchema = z.infer<typeof projectTableSchema>;
