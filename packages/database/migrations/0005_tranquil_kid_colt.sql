ALTER TABLE "payments" ADD COLUMN "last_error" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "next_action" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payment_method" text;