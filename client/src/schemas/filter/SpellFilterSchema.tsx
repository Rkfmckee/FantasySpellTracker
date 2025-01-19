import { z } from "zod";
import { SpellCastingTimeSchema } from "../spell/SpellCastingTimeSchema";
import { SpellLevelSchema } from "../spell/SpellLevelSchema";
import { SpellSchoolSchema } from "../spell/SpellSchoolSchema";
import { SpellDurationSchema } from "../spell/SpellDurationSchema";
import { SpellRangeTypeSchema } from "../spell/SpellRangeTypeSchema";
import { SpellComponentsSchema } from "../spell/SpellComponentSchema";

export const SpellFilterSchema = z.object({
    name: z.string(),
    levels: z.array(SpellLevelSchema),
    schools: z.array(SpellSchoolSchema),
    castingTime: z.array(SpellCastingTimeSchema),
    duration: z.array(SpellDurationSchema),
    rangeValue: z.string(),
    rangeType: z.array(SpellRangeTypeSchema),
    components: z.array(SpellComponentsSchema),
});

export type SpellFilter = z.infer<typeof SpellFilterSchema>;
