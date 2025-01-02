import { z } from "zod";

export enum SpellRangeType {
    Self,
    Touch,
    Feet,
    Mile,
    Sight,
    Unlimited,
}

export const SpellRangeTypeSchema = z.nativeEnum(SpellRangeType);
