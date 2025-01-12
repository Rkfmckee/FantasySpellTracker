import { z } from "zod";
import { SpellLevelSchema } from "../spell/SpellLevelSchema";
import { SpellSchoolSchema } from "../spell/SpellSchoolSchema";

export const SpellFilterSchema = z.object({
    name: z.optional(z.string()),
    levels: z.array(SpellLevelSchema),
    schools: z.array(SpellSchoolSchema),
});

export type SpellFilter = z.infer<typeof SpellFilterSchema>;
