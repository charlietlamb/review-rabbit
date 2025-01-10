ALTER TABLE "automation_items" DROP CONSTRAINT "automation_items_automation_id_automations_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "automation_items" ADD CONSTRAINT "automation_items_automation_id_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
