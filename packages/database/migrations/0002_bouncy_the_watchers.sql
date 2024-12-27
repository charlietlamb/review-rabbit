ALTER TABLE "stripe_connects" ADD COLUMN "access_token" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "token_type" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "stripe_publishable_key" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "stripe_user_id" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "stripe_connects" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;