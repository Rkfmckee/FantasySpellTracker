import { z } from "zod";
import { SpellCastingTimeSchema } from "./SpellCastingTimeSchema";
import { SpellDurationSchema } from "./SpellDurationSchema";
import { SpellLevelSchema } from "./SpellLevelSchema";
import { SpellRangeTypeSchema } from "./SpellRangeTypeSchema";
import { SpellSchoolSchema } from "./SpellSchoolSchema";
import { SpellComponentsSchema } from "./SpellComponentSchema";

export const SpellSchema = z.object({
    id: z.number(),
    name: z.string(),
    level: SpellLevelSchema,
    school: SpellSchoolSchema,
    castingTime: SpellCastingTimeSchema,
    duration: SpellDurationSchema,
    rangeValue: z.number(),
    rangeType: SpellRangeTypeSchema,
    components: SpellComponentsSchema,
});
export const SpellsSchema = z.array(SpellSchema);
export type Spell = z.infer<typeof SpellSchema>;
