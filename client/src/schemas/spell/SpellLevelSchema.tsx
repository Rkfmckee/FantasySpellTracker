import { z } from "zod";

export enum SpellLevel {
    Cantrip,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
}

export const SpellLevelSchema = z.nativeEnum(SpellLevel);

export function GetSpellLevelName(level: SpellLevel) {
    switch (level) {
        case SpellLevel.First:
            return "1st";
        case SpellLevel.Second:
            return "2nd";
        case SpellLevel.Third:
            return "3rd";
        case SpellLevel.Fourth:
            return "4th";
        case SpellLevel.Fifth:
            return "5th";
        case SpellLevel.Sixth:
            return "6th";
        case SpellLevel.Seventh:
            return "7th";
        case SpellLevel.Eighth:
            return "8th";
        case SpellLevel.Ninth:
            return "9th";
        default:
            return SpellLevel[level];
    }
}
