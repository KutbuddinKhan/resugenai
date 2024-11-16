CREATE TABLE IF NOT EXISTS "certificate" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"title" varchar(255),
	"issuer" varchar(255),
	"issue_date" date,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"project_name" varchar(255),
	"project_link" varchar(500),
	"description" text,
	"technologies" varchar(500)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certificate" ADD CONSTRAINT "certificate_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
