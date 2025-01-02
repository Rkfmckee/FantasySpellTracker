import { z } from "zod";

export enum SpellDuration {
    Instantaneous,
    OneRound,
    SixRounds,
    OneMinute,
    TenMinutes,
    OneHour,
    TwoHours,
    SixHours,
    EightHours,
    TwentyFourHours,
    OneDay,
    SevenDays,
    TenDays,
    ThirtyDays,
    UntilDispelled,
    UntilDispelledOrTriggered,
    Special,
}

export const SpellDurationSchema = z.nativeEnum(SpellDuration);

export function GetSpellDurationName(duration: SpellDuration) {
    switch (duration) {
        case SpellDuration.OneRound:
            return "1 action";
        case SpellDuration.SixRounds:
            return "6 rounds";
        case SpellDuration.OneMinute:
            return "1 minute";
        case SpellDuration.TenMinutes:
            return "10 minutes";
        case SpellDuration.OneHour:
            return "1 hour";
        case SpellDuration.TwoHours:
            return "2 hours";
        case SpellDuration.SixHours:
            return "6 hours";
        case SpellDuration.EightHours:
            return "8 hours";
        case SpellDuration.TwentyFourHours:
            return "24 hours";
        case SpellDuration.OneDay:
            return "1 day";
        case SpellDuration.SevenDays:
            return "7 days";
        case SpellDuration.TenDays:
            return "10 days";
        case SpellDuration.ThirtyDays:
            return "30 days";
        case SpellDuration.UntilDispelled:
            return "Until dispelled";
        case SpellDuration.UntilDispelledOrTriggered:
            return "Until dispelled or triggered";
        default:
            return SpellDuration[duration];
    }
}
