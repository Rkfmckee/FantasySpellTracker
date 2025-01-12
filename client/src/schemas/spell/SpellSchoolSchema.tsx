import { z } from "zod";
import { StringIsNumber } from "../../helpers/StringHelpers";

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

export function GetSpellSchoolKeys() {
    return Object.keys(SpellSchool)
        .filter(StringIsNumber)
        .map((key) => Number(key));
}
