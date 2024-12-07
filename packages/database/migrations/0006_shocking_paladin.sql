CREATE TABLE IF NOT EXISTS "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"date_of_birth" date NOT NULL,
	"address" text,
	"occupation" text,
	"annual_income" numeric(12, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
