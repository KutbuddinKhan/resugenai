import { integer, pgTable, serial, varchar, date, text } from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificateTable = pgTable("certificate", {
  id: serial("id").notNull().primaryKey(),
  docId: integer("document_id").references(() => documentTable.id, {
    onDelete: "cascade",
  }).notNull(),
  title: varchar("title", { length: 255 }),
  issuer: varchar("issuer", { length: 255 }),
  issueDate: date("issue_date"),
  description: text("description"),
});

export const certificateRelations = relations(certificateTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [certificateTable.docId],
    references: [documentTable.id],
  }),
}));

export const certificateTableSchema = createInsertSchema(certificateTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  title: true,
  issuer: true,
  issueDate: true,
  description: true,
});

export type CertificateSchema = z.infer<typeof certificateTableSchema>;
