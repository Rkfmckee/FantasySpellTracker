import { Container } from "@mui/material";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </main>
        </>
    );
}
