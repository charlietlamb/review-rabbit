import { db } from '@rabbit/database/postgres'
import { automationItems } from '@rabbit/database/schema/app/automation-items'
import { eq } from 'drizzle-orm'
import { AutomationItemPartial } from '@rabbit/database/types/automation-types'

export const updateAutomationItem = async (
  data: AutomationItemPartial,
  id: string
) => {
  await db.update(automationItems).set(data).where(eq(automationItems.id, id))
}
