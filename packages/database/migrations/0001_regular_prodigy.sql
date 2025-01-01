ALTER TABLE "businesses" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "businesses" ADD COLUMN "url" text NOT NULL;