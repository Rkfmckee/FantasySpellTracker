import { z } from "zod";

export const SpellSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export const SpellsSchema = z.array(SpellSchema);
export type Spell = z.infer<typeof SpellSchema>;
