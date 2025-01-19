import { z } from "zod";

export enum SpellConcentrationOrRitual {
    Concentration,
    Ritual,
}

export const SpellConcentrationOrRitualSchema = z.nativeEnum(
    SpellConcentrationOrRitual
);
