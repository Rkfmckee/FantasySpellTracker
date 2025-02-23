import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { ThemeMode } from "./ThemeSelector";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { ErrorBoundary } from "./ErrorBoundary";
import Error from "../pages/status/Error";

export default function Layout() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<ThemeMode>("system");

    const themeToPalette = (themeMode: ThemeMode) => {
        if (themeMode == "dark" || themeMode == "light") return themeMode;
        if (themeMode == "system") {
            if (prefersDarkMode) return "dark";
            else return "light";
        }
    };

    const theme = createTheme({
        palette: {
            mode: themeToPalette(mode),
            white: {
                main: "#FFFFFF",
            },
        },
        cssVariables: true,
    });

    return (
        <>
            <ErrorBoundary fallback={<Error />}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <main className="d-flex flex-column min-vh-100">
                        <Navbar mode={mode} setMode={setMode} />
                        <Container maxWidth="xl">
                            <Outlet />
                        </Container>
                        <Footer />
                    </main>
                </ThemeProvider>
            </ErrorBoundary>
        </>
    );
}
