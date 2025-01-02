import { z } from "zod";

export enum SpellCastingTime {
    Action,
    BonusAction,
    Reaction,
    OneMinute,
    TenMinutes,
    OneHour,
    EightHours,
    TwelveHours,
    TwentyFourHours,
}

export const SpellCastingTimeSchema = z.nativeEnum(SpellCastingTime);

export function GetSpellCastingTimeName(castingTime: SpellCastingTime) {
    switch (castingTime) {
        case SpellCastingTime.Action:
            return "1 action";
        case SpellCastingTime.BonusAction:
            return "1 bonus action";
        case SpellCastingTime.Reaction:
            return "1 reaction";
        case SpellCastingTime.OneMinute:
            return "1 minute";
        case SpellCastingTime.TenMinutes:
            return "10 minutes";
        case SpellCastingTime.OneHour:
            return "1 hour";
        case SpellCastingTime.EightHours:
            return "8 hours";
        case SpellCastingTime.TwelveHours:
            return "12 hours";
        case SpellCastingTime.TwentyFourHours:
            return "24 hours";
        default:
            return SpellCastingTime[castingTime];
    }
}
