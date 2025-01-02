import { z } from "zod";

export enum SpellSchool {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Illusion,
    Necromancy,
    Transmutation,
}

export const SpellSchoolSchema = z.nativeEnum(SpellSchool);
