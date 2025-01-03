import { z } from "zod";

export enum SpellComponents {
    None = 0,
    Verbal = 1 << 0,
    Somatic = 1 << 1,
    Material = 1 << 2,

    All = Verbal | Somatic | Material,
}

export const SpellComponentsSchema = z.nativeEnum(SpellComponents);

export function GetSpellComponentsName(components: SpellComponents) {
    switch (components) {
        case SpellComponents.Verbal:
            return "V";
        case SpellComponents.Somatic:
            return "S";
        case SpellComponents.Material:
            return "M";
        case SpellComponents.Verbal | SpellComponents.Somatic:
            return "V S";
        case SpellComponents.Verbal | SpellComponents.Material:
            return "V M";
        case SpellComponents.Somatic | SpellComponents.Material:
            return "S M";
        case SpellComponents.All:
            return "V S M";
    }
}
