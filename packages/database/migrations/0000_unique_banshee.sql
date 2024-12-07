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

-- Seed data for clients
INSERT INTO "clients" ("id", "user_id", "name", "email", "phone_number", "created_at", "updated_at")
VALUES
  ('c1d2e3f4-a5b6-47c8-9d0e-1f2a3b4c5d6e', '5162539a-0608-4624-abe9-02c45dc43f04', 'John Smith', 'john.smith@email.com', '+1-555-0123', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
  ('d2e3f4g5-b6c7-58d9-0e1f-2a3b4c5d6e7f', '5162539a-0608-4624-abe9-02c45dc43f04', 'Sarah Johnson', 'sarah.j@email.com', '+1-555-0124', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
  ('e3f4g5h6-c7d8-69e0-1f2a-3b4c5d6e7f8g', '5162539a-0608-4624-abe9-02c45dc43f04', 'Michael Brown', 'michael.b@email.com', '+1-555-0125', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
  ('f4g5h6i7-d8e9-70f1-2a3b-4c5d6e7f8g9h', '5162539a-0608-4624-abe9-02c45dc43f04', 'Emma Wilson', 'emma.w@email.com', '+1-555-0126', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
  ('g5h6i7j8-e9f0-81g2-3b4c-5d6e7f8g9h0i', '5162539a-0608-4624-abe9-02c45dc43f04', 'David Lee', 'david.lee@email.com', '+1-555-0127', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
  ('h6i7j8k9-f0g1-92h3-4c5d-6e7f8g9h0i1j', '5162539a-0608-4624-abe9-02c45dc43f04', 'Lisa Anderson', 'lisa.a@email.com', '+1-555-0128', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
  ('i7j8k9l0-g1h2-03i4-5d6e-7f8g9h0i1j2k', '5162539a-0608-4624-abe9-02c45dc43f04', 'James Wilson', 'james.w@email.com', '+1-555-0129', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
  ('j8k9l0m1-h2i3-14j5-6e7f-8g9h0i1j2k3l', '5162539a-0608-4624-abe9-02c45dc43f04', 'Maria Garcia', 'maria.g@email.com', '+1-555-0130', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('k9l0m1n2-i3j4-25k6-7f8g-9h0i1j2k3l4m', '5162539a-0608-4624-abe9-02c45dc43f04', 'Robert Taylor', 'robert.t@email.com', '+1-555-0131', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('l0m1n2o3-j4k5-36l7-8g9h-0i1j2k3l4m5n', '5162539a-0608-4624-abe9-02c45dc43f04', 'Jennifer Martinez', 'jennifer.m@email.com', '+1-555-0132', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
  ('m1n2o3p4-k5l6-47m8-9h0i-1j2k3l4m5n6o', '5162539a-0608-4624-abe9-02c45dc43f04', 'William Thompson', 'william.t@email.com', '+1-555-0133', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
  ('n2o3p4q5-l6m7-58n9-0i1j-2k3l4m5n6o7p', '5162539a-0608-4624-abe9-02c45dc43f04', 'Patricia White', 'patricia.w@email.com', '+1-555-0134', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('o3p4q5r6-m7n8-69o0-1j2k-3l4m5n6o7p8q', '5162539a-0608-4624-abe9-02c45dc43f04', 'Thomas Harris', 'thomas.h@email.com', '+1-555-0135', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('p4q5r6s7-n8o9-70p1-2k3l-4m5n6o7p8q9r', '5162539a-0608-4624-abe9-02c45dc43f04', 'Elizabeth Clark', 'elizabeth.c@email.com', '+1-555-0136', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  ('q5r6s7t8-o9p0-81q2-3l4m-5n6o7p8q9r0s', '5162539a-0608-4624-abe9-02c45dc43f04', 'Daniel Rodriguez', 'daniel.r@email.com', '+1-555-0137', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  ('r6s7t8u9-p0q1-92r3-4m5n-6o7p8q9r0s1t', '5162539a-0608-4624-abe9-02c45dc43f04', 'Margaret Lewis', 'margaret.l@email.com', '+1-555-0138', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  ('s7t8u9v0-q1r2-03s4-5n6o-7p8q9r0s1t2u', '5162539a-0608-4624-abe9-02c45dc43f04', 'Joseph Lee', 'joseph.l@email.com', '+1-555-0139', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  ('t8u9v0w1-r2s3-14t5-6o7p-8q9r0s1t2u3v', '5162539a-0608-4624-abe9-02c45dc43f04', 'Susan Walker', 'susan.w@email.com', '+1-555-0140', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '12 hours'),
  ('u9v0w1x2-s3t4-25u6-7p8q-9r0s1t2u3v4w', '5162539a-0608-4624-abe9-02c45dc43f04', 'Christopher Hall', 'chris.h@email.com', '+1-555-0141', NOW() - INTERVAL '6 hours', NOW() - INTERVAL '6 hours'),
  ('v0w1x2y3-t4u5-36v7-8q9r-0s1t2u3v4w5x', '5162539a-0608-4624-abe9-02c45dc43f04', 'Jessica Young', 'jessica.y@email.com', '+1-555-0142', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour');