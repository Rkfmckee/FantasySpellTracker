export function SortNameDescending(sortName: string) {
    const commaRegex = /,/g;
    return `-${sortName.replace(commaRegex, ",-")}`;
}
