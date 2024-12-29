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
	"currency" text DEFAULT 'usd' NOT NULL,
	"onboardingCompleted" boolean DEFAULT false NOT NULL,
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
CREATE TABLE IF NOT EXISTS "stripe_connects" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text DEFAULT 'Connected Account' NOT NULL,
	"onboardingCompleted" boolean DEFAULT false NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"token_type" text,
	"stripe_publishable_key" text,
	"stripe_user_id" text,
	"scope" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_products" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_connect_id" text NOT NULL,
	"title" text NOT NULL,
	"stripe_product_id" text NOT NULL,
	"stripe_test_product_id" text NOT NULL,
	"tax_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_prices" (
	"id" text PRIMARY KEY NOT NULL,
	"stripe_product_id" text,
	"stripe_price_id" text,
	"title" text,
	"amount" integer,
	"currency" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stripe_oauth_states" (
	"state" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_balance_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"stripeConnectId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"description" text,
	"fee" numeric(32, 2),
	"net" numeric(32, 2),
	"availableOn" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_balance_transactions_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_charge_disputes" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"chargeId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"reason" text,
	"evidenceDueBy" timestamp,
	"isRefunded" boolean DEFAULT false,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_charge_disputes_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_charges" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"paymentId" text,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"paymentMethod" text NOT NULL,
	"description" text,
	"failureCode" text,
	"failureMessage" text,
	"disputed" boolean DEFAULT false,
	"refunded" boolean DEFAULT false,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_charges_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_checkout_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text,
	"paymentIntentId" text,
	"status" text NOT NULL,
	"mode" text NOT NULL,
	"currency" text NOT NULL,
	"amountTotal" numeric(32, 2),
	"amountSubtotal" numeric(32, 2),
	"paymentStatus" text,
	"url" text,
	"expiresAt" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_checkout_sessions_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_customer_payment_methods" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"billingDetails" jsonb,
	"card" jsonb,
	"isDefault" boolean DEFAULT false,
	"expiresAt" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_customer_payment_methods_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_customers" (
	"id" text PRIMARY KEY NOT NULL,
	"stripeId" text NOT NULL,
	"userId" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"phone" text,
	"address" jsonb,
	"shipping" jsonb,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_customers_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_discounts" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"couponId" text,
	"promotionCodeId" text,
	"start" timestamp NOT NULL,
	"end" timestamp,
	"currency" text,
	"amountOff" numeric(32, 2),
	"percentOff" numeric(5, 2),
	"duration" text NOT NULL,
	"durationInMonths" integer,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_discounts_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_events" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"data" jsonb NOT NULL,
	"stripeAccountId" text,
	"stripeEventId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"processedAt" timestamp,
	"error" jsonb,
	CONSTRAINT "wh_events_stripeEventId_unique" UNIQUE("stripeEventId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"subscriptionId" text,
	"paymentIntentId" text,
	"status" text NOT NULL,
	"currency" text NOT NULL,
	"amountDue" numeric(32, 2) NOT NULL,
	"amountPaid" numeric(32, 2) NOT NULL,
	"amountRemaining" numeric(32, 2) NOT NULL,
	"subtotal" numeric(32, 2) NOT NULL,
	"total" numeric(32, 2) NOT NULL,
	"tax" numeric(32, 2),
	"billingReason" text,
	"collectionMethod" text,
	"description" text,
	"dueDate" timestamp,
	"paid" boolean DEFAULT false,
	"paidAt" timestamp,
	"voidedAt" timestamp,
	"sentAt" timestamp,
	"periodStart" timestamp,
	"periodEnd" timestamp,
	"receiptNumber" text,
	"statementDescriptor" text,
	"requiresAction" boolean DEFAULT false,
	"lastPaymentError" jsonb DEFAULT '{}'::jsonb,
	"nextPaymentAttempt" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_invoices_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_payment_intents" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"paymentMethod" text,
	"description" text,
	"canceledAt" timestamp,
	"capturedAt" timestamp,
	"paidAt" timestamp,
	"confirmationMethod" text,
	"requiresAction" boolean DEFAULT false,
	"requiresCapture" boolean DEFAULT false,
	"setupFutureUsage" text,
	"lastPaymentError" jsonb DEFAULT '{}',
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_payment_intents_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_payments" (
	"id" text PRIMARY KEY NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"subscriptionId" text NOT NULL,
	"paymentIntentId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"paymentMethod" text NOT NULL,
	"receiptEmail" text,
	"receiptUrl" text,
	"failureMessage" text,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_payments_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_payouts" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"stripeConnectId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"type" text NOT NULL,
	"method" text NOT NULL,
	"bankAccount" jsonb,
	"failureCode" text,
	"failureMessage" text,
	"arrivalDate" timestamp,
	"paidAt" timestamp,
	"canceledAt" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_payouts_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_refunds" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"chargeId" text NOT NULL,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"status" text NOT NULL,
	"reason" text,
	"receiptNumber" text,
	"failureReason" text,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_refunds_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_setup_intents" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"status" text NOT NULL,
	"clientSecret" text,
	"description" text,
	"paymentMethodTypes" jsonb,
	"usage" text,
	"lastSetupError" jsonb,
	"nextAction" jsonb,
	"paymentMethodOptions" jsonb,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_setup_intents_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_subscription_schedules" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"subscriptionId" text,
	"status" text NOT NULL,
	"phases" jsonb,
	"currentPhase" jsonb,
	"defaultSettings" jsonb,
	"endBehavior" text,
	"releasedAt" timestamp,
	"releasedSubscription" jsonb,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_subscription_schedules_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"stripeId" text NOT NULL,
	"customerId" text NOT NULL,
	"status" text NOT NULL,
	"priceId" text NOT NULL,
	"quantity" numeric(32, 2) NOT NULL,
	"cancelAtPeriodEnd" boolean DEFAULT false,
	"cancelAt" timestamp,
	"canceledAt" timestamp,
	"currentPeriodStart" timestamp,
	"currentPeriodEnd" timestamp,
	"endedAt" timestamp,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_subscriptions_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_tax_rates" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"displayName" text NOT NULL,
	"description" text,
	"jurisdiction" text,
	"percentage" numeric(6, 4) NOT NULL,
	"inclusive" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"country" text,
	"state" text,
	"taxType" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_tax_rates_stripeId_unique" UNIQUE("stripeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wh_transfers" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeId" text NOT NULL,
	"stripeConnectId" text NOT NULL,
	"chargeId" text,
	"amount" numeric(32, 2) NOT NULL,
	"currency" text NOT NULL,
	"description" text,
	"destinationPayment" text,
	"reversals" jsonb,
	"balanceTransaction" jsonb,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wh_transfers_stripeId_unique" UNIQUE("stripeId")
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
 ALTER TABLE "stripe_connects" ADD CONSTRAINT "stripe_connects_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_products" ADD CONSTRAINT "stripe_products_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_products" ADD CONSTRAINT "stripe_products_stripe_connect_id_stripe_connects_id_fk" FOREIGN KEY ("stripe_connect_id") REFERENCES "public"."stripe_connects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_prices" ADD CONSTRAINT "stripe_prices_stripe_product_id_stripe_products_id_fk" FOREIGN KEY ("stripe_product_id") REFERENCES "public"."stripe_products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_oauth_states" ADD CONSTRAINT "stripe_oauth_states_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_balance_transactions" ADD CONSTRAINT "wh_balance_transactions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_balance_transactions" ADD CONSTRAINT "wh_balance_transactions_stripeConnectId_stripe_connects_id_fk" FOREIGN KEY ("stripeConnectId") REFERENCES "public"."stripe_connects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_charge_disputes" ADD CONSTRAINT "wh_charge_disputes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_charge_disputes" ADD CONSTRAINT "wh_charge_disputes_chargeId_wh_charges_id_fk" FOREIGN KEY ("chargeId") REFERENCES "public"."wh_charges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_charges" ADD CONSTRAINT "wh_charges_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_charges" ADD CONSTRAINT "wh_charges_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_charges" ADD CONSTRAINT "wh_charges_paymentId_wh_payments_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."wh_payments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_checkout_sessions" ADD CONSTRAINT "wh_checkout_sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_checkout_sessions" ADD CONSTRAINT "wh_checkout_sessions_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_checkout_sessions" ADD CONSTRAINT "wh_checkout_sessions_paymentIntentId_wh_payment_intents_id_fk" FOREIGN KEY ("paymentIntentId") REFERENCES "public"."wh_payment_intents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_customer_payment_methods" ADD CONSTRAINT "wh_customer_payment_methods_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_customer_payment_methods" ADD CONSTRAINT "wh_customer_payment_methods_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_customers" ADD CONSTRAINT "wh_customers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_discounts" ADD CONSTRAINT "wh_discounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_discounts" ADD CONSTRAINT "wh_discounts_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_events" ADD CONSTRAINT "wh_events_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_invoices" ADD CONSTRAINT "wh_invoices_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_invoices" ADD CONSTRAINT "wh_invoices_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_invoices" ADD CONSTRAINT "wh_invoices_subscriptionId_wh_subscriptions_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "public"."wh_subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_invoices" ADD CONSTRAINT "wh_invoices_paymentIntentId_wh_payment_intents_id_fk" FOREIGN KEY ("paymentIntentId") REFERENCES "public"."wh_payment_intents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payment_intents" ADD CONSTRAINT "wh_payment_intents_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payment_intents" ADD CONSTRAINT "wh_payment_intents_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payments" ADD CONSTRAINT "wh_payments_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payments" ADD CONSTRAINT "wh_payments_subscriptionId_wh_subscriptions_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "public"."wh_subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payments" ADD CONSTRAINT "wh_payments_paymentIntentId_wh_payment_intents_id_fk" FOREIGN KEY ("paymentIntentId") REFERENCES "public"."wh_payment_intents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payouts" ADD CONSTRAINT "wh_payouts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_payouts" ADD CONSTRAINT "wh_payouts_stripeConnectId_stripe_connects_id_fk" FOREIGN KEY ("stripeConnectId") REFERENCES "public"."stripe_connects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_refunds" ADD CONSTRAINT "wh_refunds_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_refunds" ADD CONSTRAINT "wh_refunds_chargeId_wh_charges_id_fk" FOREIGN KEY ("chargeId") REFERENCES "public"."wh_charges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_setup_intents" ADD CONSTRAINT "wh_setup_intents_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_subscription_schedules" ADD CONSTRAINT "wh_subscription_schedules_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_subscription_schedules" ADD CONSTRAINT "wh_subscription_schedules_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_subscription_schedules" ADD CONSTRAINT "wh_subscription_schedules_subscriptionId_wh_subscriptions_id_fk" FOREIGN KEY ("subscriptionId") REFERENCES "public"."wh_subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_subscriptions" ADD CONSTRAINT "wh_subscriptions_customerId_wh_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."wh_customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_tax_rates" ADD CONSTRAINT "wh_tax_rates_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_transfers" ADD CONSTRAINT "wh_transfers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_transfers" ADD CONSTRAINT "wh_transfers_stripeConnectId_stripe_connects_id_fk" FOREIGN KEY ("stripeConnectId") REFERENCES "public"."stripe_connects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wh_transfers" ADD CONSTRAINT "wh_transfers_chargeId_wh_charges_id_fk" FOREIGN KEY ("chargeId") REFERENCES "public"."wh_charges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
