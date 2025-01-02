import parse from "html-react-parser";

export function ToLinebreak(value: string) {
    return parse(value.replace("\n", "<br><br>"));
}
