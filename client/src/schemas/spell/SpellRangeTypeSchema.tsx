import { z } from "zod";
import { StringIsNumber } from "../../helpers/StringHelpers";

export enum SpellRangeType {
    Self,
    Touch,
    Feet,
    Mile,
    Sight,
    Unlimited,
}

export const SpellRangeTypeSchema = z.nativeEnum(SpellRangeType);

export function GetSpellRangeTypeKeys() {
    return Object.keys(SpellRangeType)
        .filter(StringIsNumber)
        .map((key) => Number(key));
}
