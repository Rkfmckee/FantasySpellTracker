import { Class } from "../schemas/class/ClassSchema";
import { Source } from "../schemas/source/SourceSchema";

export function SortNameDescending(sortName: string) {
    const commaRegex = /,/g;
    return `-${sortName.replace(commaRegex, ",-")}`;
}

export function TextToFilterUrl(value: string | null | undefined, propName: string, operator: string = "@=", hasQuotes: boolean = true) {
    //E.g. rangeValue==60&&name@="frost"
    const valueWithAppropriateQuotes = hasQuotes ? `"${value}"` : value;

    if (value) return `${propName}${operator}${valueWithAppropriateQuotes}`;
    return null;
}

export function EnumListToFilterUrl(values: number[] | undefined, propName: string) {
    //E.g. level^^[3,4]
    if (values && values.length > 0) {
        return `${propName}^^[${values.join(",")}]`;
    }
    return null;
}

export function EnumFlagsToFilterUrl(values: number[] | undefined, propName: string) {
    if (values && values.length > 0) {
        let flagValue = 0;
        values.forEach((value) => (flagValue = flagValue | value));
        return `${propName}==${flagValue}`;
    }
    return null;
}

export function SpellFlagsToFilterUrl(values: "concentration" | "ritual" | "upcast" | "materialCost" | null | undefined): string[] {
    const parts = [];

    if (values && values.length > 0) {
        if (values.includes("concentration")) {
            parts.push("isConcentration==true");
        }

        if (values.includes("ritual")) {
            parts.push("isRitual==true");
        }

        if (values.includes("upcast")) {
            parts.push("higherLevelDescription!=null");
        }

        if (values.includes("materialCost")) {
            parts.push("componentsCost!=null");
        }
    }

    return parts;
}

export function SourcesToFilterUrl(sources: Source[] | undefined) {
    if (sources && sources.length > 0) {
        return `sourceId^^[${sources.map((source) => source.id).join(",")}]`;
    }
    return null;
}

export function OnlyOfficialToFilterUrl(onlyOfficial: boolean | undefined) {
    if (onlyOfficial) {
        return `sourceId!^^[1,81,83,85]`;
    }
    return null;
}

export function ClassesToFilterUrl(classes: Class[] | undefined) {
    if (classes && classes.length > 0) {
        return `&${classes.map((spellClass) => `cid=${spellClass.id}`).join("&")}`;
    }
    return "";
}
