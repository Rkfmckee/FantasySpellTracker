import { z } from "zod";
import { SpellCastingTimeSchema } from "./SpellCastingTimeSchema";
import { SpellDurationSchema } from "./SpellDurationSchema";
import { SpellLevelSchema } from "./SpellLevelSchema";
import { SpellRangeTypeSchema } from "./SpellRangeTypeSchema";
import { SpellSchoolSchema } from "./SpellSchoolSchema";
import { SpellComponentsSchema } from "./SpellComponentSchema";
import { SourceSchema } from "../source/SourceSchema";
import { SpellClassSchema } from "../class/SpellClassSchema";

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
    componentsDescription: z.optional(z.string()),
    componentsCost: z.optional(z.string()),
    description: z.string(),
    higherLevelDescription: z.optional(z.string()),
    castingTimeDescription: z.optional(z.string()),
    rangeDescription: z.optional(z.string()),
    isConcentration: z.boolean(),
    isRitual: z.boolean(),
    canUpcast: z.boolean(),
    source: SourceSchema,
    classes: z.array(SpellClassSchema),
});
export const SpellsSchema = z.array(SpellSchema);
export type Spell = z.infer<typeof SpellSchema>;
