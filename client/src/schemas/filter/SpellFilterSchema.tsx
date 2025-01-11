import { z } from "zod";
import { SpellLevelSchema } from "../spell/SpellLevelSchema";

export const SpellFilterSchema = z.object({
    name: z.optional(z.string()),
    levels: z.optional(SpellLevelSchema),
});

export type SpellFilter = z.infer<typeof SpellFilterSchema>;
