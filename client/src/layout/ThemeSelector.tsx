import {
    DarkMode,
    DarkModeOutlined,
    LightMode,
    LightModeOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeProps {
    mode: ThemeMode;
    setMode: (item: ThemeMode) => void;
}

export default function ThemeSelector({ mode, setMode }: ThemeProps) {
    const themeModes = [
        {
            name: "light",
            activeComponent: <LightMode />,
            inactiveComponent: <LightModeOutlined />,
        },
        {
            name: "dark",
            activeComponent: <DarkMode />,
            inactiveComponent: <DarkModeOutlined />,
        },
    ];

    function handleThemeButtonClick(themeModeName: string) {
        if (mode != themeModeName) setMode(themeModeName as ThemeMode);
        else setMode("system");
    }

    return (
        <Box>
            {themeModes.map((themeMode) => (
                <IconButton
                    key={themeMode.name}
                    aria-label={themeMode.name}
                    onClick={() => handleThemeButtonClick(themeMode.name)}
                    color="inherit"
                    title={`Change to ${themeMode.name} mode`}
                >
                    {mode == themeMode.name
                        ? themeMode.activeComponent
                        : themeMode.inactiveComponent}
                </IconButton>
            ))}
        </Box>
    );
}
