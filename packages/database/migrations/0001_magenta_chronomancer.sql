ALTER TABLE "stripe_prices" DROP CONSTRAINT "stripe_prices_stripe_product_id_stripe_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stripe_prices" ADD CONSTRAINT "stripe_prices_stripe_product_id_stripe_products_id_fk" FOREIGN KEY ("stripe_product_id") REFERENCES "public"."stripe_products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
