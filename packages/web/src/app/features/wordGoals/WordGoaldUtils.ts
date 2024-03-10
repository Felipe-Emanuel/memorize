import { z } from 'zod'

export const updateWordGoalsSchema = z.object({
  goal: z.coerce.number().min(100, 'Mínimo de 100.'),
})

export type TUpdateWordGoalsSchema = z.infer<typeof updateWordGoalsSchema>
