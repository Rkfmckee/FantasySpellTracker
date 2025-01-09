export function NewlineToLinebreak(value: string) {
    return value.replace(/(?:\r\n|\r|\n)/g, "<br><br>");
}

export function StringIsNumber(value: string) {
    return isNaN(Number(value)) === false;
}
