CREATE TABLE IF NOT EXISTS "dubs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" text DEFAULT 'incomplete' NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "url" text DEFAULT '' NOT NULL;