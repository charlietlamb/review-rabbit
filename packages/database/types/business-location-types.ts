import { z } from 'zod'
import { businesses } from '../schema/app/businesses'
import { locations } from '../schema/app/locations'
import { createSelectSchema } from 'drizzle-zod'

export const businessSelectSchema = createSelectSchema(businesses)
export type Business = z.infer<typeof businessSelectSchema>

export const locationSelectSchema = createSelectSchema(locations)
export type Location = z.infer<typeof locationSelectSchema>

export const businessFormSchema = businessSelectSchema.pick({
  name: true,
  email: true,
  url: true,
  phone: true,
  image: true,
})
export type BusinessForm = z.infer<typeof businessFormSchema>

export const businessFormWithIdSchema = businessFormSchema.extend({
  id: z.string(),
})
export type BusinessFormWithId = z.infer<typeof businessFormWithIdSchema>

export const businessWithLocationsSchema = businessSelectSchema.extend({
  locations: locationSelectSchema.array(),
})
export type BusinessWithLocations = z.infer<typeof businessWithLocationsSchema>

export const locationFormSchema = locationSelectSchema.pick({
  name: true,
  url: true,
  phone: true,
  image: true,
})
export type LocationForm = z.infer<typeof locationFormSchema>

export const locationFormWithIdSchema = locationFormSchema.extend({
  id: z.string(),
})
export type LocationFormWithId = z.infer<typeof locationFormWithIdSchema>

export const locationWithBusinessSchema = locationSelectSchema.extend({
  business: businessSelectSchema,
})
export type LocationWithBusiness = z.infer<typeof locationWithBusinessSchema>
