CREATE TABLE IF NOT EXISTS "notes" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"mediation_id" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mediation_clients" DROP CONSTRAINT "mediation_clients_mediation_id_mediations_id_fk";
--> statement-breakpoint
ALTER TABLE "mediation_clients" DROP CONSTRAINT "mediation_clients_client_id_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "mediation_clients" DROP CONSTRAINT "mediation_clients_invoice_id_invoices_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_mediation_id_mediations_id_fk" FOREIGN KEY ("mediation_id") REFERENCES "public"."mediations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mediation_clients" ADD CONSTRAINT "mediation_clients_mediation_id_mediations_id_fk" FOREIGN KEY ("mediation_id") REFERENCES "public"."mediations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mediation_clients" ADD CONSTRAINT "mediation_clients_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mediation_clients" ADD CONSTRAINT "mediation_clients_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
