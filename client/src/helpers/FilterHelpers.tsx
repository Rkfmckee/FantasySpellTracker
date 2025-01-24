export function SortNameDescending(sortName: string) {
    const commaRegex = /,/g;
    return `-${sortName.replace(commaRegex, ",-")}`;
}

export function TextToFilterUrl(
    value: string | null | undefined,
    propName: string,
    operator: string = "@="
) {
    if (value) return `${propName}${operator}${value},`;
    return "";
}

export function EnumListToFilterUrl(
    values: number[] | undefined,
    propName: string
) {
    if (values && values.length > 0) {
        return `${propName}==${values.join("|")},`;
    }
    return "";
}

export function EnumFlagsToFilterUrl(
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

export function SpellConcentrationOrRitualToFilterUrl(
    values:
        | "concentration"
        | "ritual"
        | "upcast"
        | "materialCost"
        | null
        | undefined
) {
    let url = "";

    if (values && values.length > 0) {
        if (values.includes("concentration")) {
            url += "isConcentration==true,";
        }

        if (values.includes("ritual")) {
            url += "isRitual==true,";
        }

        if (values.includes("upcast")) {
            url += "canUpcast==true,";
        }

        if (values.includes("materialCost")) {
            url += "hasMaterialCost==true,";
        }
    }

    return url;
}
