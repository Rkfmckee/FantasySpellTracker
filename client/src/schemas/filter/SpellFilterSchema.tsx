import { z } from "zod";

export const SpellFilterSchema = z.object({
    name: z.optional(z.string()),
});

export type SpellFilter = z.infer<typeof SpellFilterSchema>;
