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
            return "VS";
        case SpellComponents.Verbal | SpellComponents.Material:
            return "VM";
        case SpellComponents.Somatic | SpellComponents.Material:
            return "SM";
        case SpellComponents.All:
            return "VSM";
    }
}
