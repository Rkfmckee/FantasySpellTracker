export function NewlineToLinebreak(value: string | undefined | null) {
    if (!value) return "";

    return value.replace(/(?:\r\n|\r|\n)(?!<)/g, "<br><br>");
}

export function LinebreakBeforeBold(value: string | undefined | null) {
    if (!value) return "";

    return value.replace(/(?:<strong>)/g, "<strong><br><br>");
}

export function StringIsNumber(value: string) {
    return isNaN(Number(value)) === false;
}
