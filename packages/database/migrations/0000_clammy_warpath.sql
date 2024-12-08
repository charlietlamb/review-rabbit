CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshToken" text,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"idToken" text,
	"expiresAt" timestamp,
	"password" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"token" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"imageUploaded" boolean DEFAULT false NOT NULL,
	"imageExpiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"mimeType" text NOT NULL,
	"duration" integer NOT NULL,
	"url" text NOT NULL,
	"source" text NOT NULL,
	"language" text,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_connects" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"onboardingCompleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"client_id" text NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'GBP' NOT NULL,
	"due_date" timestamp NOT NULL,
	"issue_date" timestamp NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "media" ADD CONSTRAINT "media_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_connects" ADD CONSTRAINT "stripe_connects_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


DO $$ 
DECLARE 
  user_id text;
  client_id text;
BEGIN
  -- Get a sample user ID
  SELECT id INTO user_id FROM users LIMIT 1;
  
  -- Get a sample client ID
  SELECT id INTO client_id FROM clients LIMIT 1;

  -- Insert 20 sample invoices
  INSERT INTO invoices (
    user_id,
    client_id,
    paid,
    amount,
    currency,
    due_date,
    issue_date,
    paid_at,
    created_at,
    updated_at
  ) VALUES
    (user_id, client_id, true, 1500.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
    (user_id, client_id, true, 2300.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
    (user_id, client_id, true, 1800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
    (user_id, client_id, true, 3200.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
    (user_id, client_id, true, 2100.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
    (user_id, client_id, true, 1600.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
    (user_id, client_id, true, 2800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    (user_id, client_id, true, 1900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
    (user_id, client_id, true, 3500.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
    (user_id, client_id, true, 2400.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NOW(), NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
    (user_id, client_id, false, 1700.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    (user_id, client_id, false, 2900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
    (user_id, client_id, false, 2000.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    (user_id, client_id, false, 3300.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
    (user_id, client_id, false, 2600.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    (user_id, client_id, false, 1800.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
    (user_id, client_id, false, 3100.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 2200.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 2700.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW()),
    (user_id, client_id, false, 1900.00, 'GBP', NOW() + INTERVAL '30 days', NOW(), NULL, NOW(), NOW());
END $$; 