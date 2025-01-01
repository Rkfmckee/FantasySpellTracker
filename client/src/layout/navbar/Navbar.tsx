import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navlink from "./Navlink";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <AppBar position="static" className="mb-4">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" className="nav-link">
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ mr: 2 }}
                        >
                            Fantasy Spell Tracker
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            marginTop: "0.25em",
                        }}
                    >
                        <Navlink to="items" />
                        <Navlink to="about" />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
