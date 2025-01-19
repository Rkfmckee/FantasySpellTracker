import { SpellConcentrationOrRitual } from "../schemas/spell/SpellConcentrationOrRitualSchema";

export function SortNameDescending(sortName: string) {
    const commaRegex = /,/g;
    return `-${sortName.replace(commaRegex, ",-")}`;
}

export function TextToFilter(
    value: string | null | undefined,
    propName: string,
    operator: string = "@="
) {
    if (value) return `${propName}${operator}${value},`;
    return "";
}

export function EnumListToFilter(
    values: number[] | undefined,
    propName: string
) {
    if (values && values.length > 0) {
        return `${propName}==${values.join("|")},`;
    }
    return "";
}

export function EnumFlagsToFilter(
    values: number[] | undefined,
    propName: string
) {
    if (values && values.length > 0) {
        let flagValue = 0;
        values.forEach((value) => (flagValue = flagValue | value));
        return `${propName}==${flagValue},`;
    }
    return "";
}

export function SpellConcentrationOrRitualToFilter(
    values: SpellConcentrationOrRitual[] | undefined
) {
    let url = "";

    if (values && values.length > 0) {
        if (values.includes(SpellConcentrationOrRitual.Concentration)) {
            url += "isConcentration==true,";
        }

        if (values.includes(SpellConcentrationOrRitual.Ritual)) {
            url += "isRitual==true,";
        }
    }

    return url;
}
