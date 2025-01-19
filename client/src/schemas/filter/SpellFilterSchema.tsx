import { z } from "zod";
import { SpellCastingTimeSchema } from "../spell/SpellCastingTimeSchema";
import { SpellComponentsSchema } from "../spell/SpellComponentSchema";
import { SpellConcentrationOrRitualSchema } from "../spell/SpellConcentrationOrRitualSchema";
import { SpellDurationSchema } from "../spell/SpellDurationSchema";
import { SpellLevelSchema } from "../spell/SpellLevelSchema";
import { SpellRangeTypeSchema } from "../spell/SpellRangeTypeSchema";
import { SpellSchoolSchema } from "../spell/SpellSchoolSchema";

export const SpellFilterSchema = z.object({
    name: z.string(),
    levels: z.array(SpellLevelSchema),
    schools: z.array(SpellSchoolSchema),
    castingTime: z.array(SpellCastingTimeSchema),
    duration: z.array(SpellDurationSchema),
    rangeValue: z.string(),
    rangeType: z.array(SpellRangeTypeSchema),
    components: z.array(SpellComponentsSchema),
    concentrationOrRitual: z.array(SpellConcentrationOrRitualSchema),
});

export type SpellFilter = z.infer<typeof SpellFilterSchema>;
