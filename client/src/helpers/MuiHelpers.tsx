import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function IsMobile() {
    const theme = useTheme();
    return !useMediaQuery(theme.breakpoints.up("md"));
}
