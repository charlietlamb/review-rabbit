import type { ClickWithData } from '@rabbit/database/schema/app/clicks'

export function transformClick(click: any): ClickWithData {
  return {
    ...click,
    createdAt: new Date(click.createdAt),
    updatedAt: new Date(click.updatedAt),
    automationItem: click.automationItem
      ? {
          ...click.automationItem,
          createdAt: new Date(click.automationItem.createdAt),
          updatedAt: new Date(click.automationItem.updatedAt),
          scheduledFor: new Date(click.automationItem.scheduledFor),
        }
      : null,
    business: {
      ...click.business,
      createdAt: new Date(click.business.createdAt),
      updatedAt: new Date(click.business.updatedAt),
    },
  }
}
