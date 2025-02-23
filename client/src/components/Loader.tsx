import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
    centered?: boolean;
}

export default function Loader(props: LoaderProps) {
    return (
        <Box className={`my-5 ${props.centered && "center-children"}`}>
            <Typography variant="h2" gutterBottom>
                Loading...
            </Typography>
            <CircularProgress size="5em" />
        </Box>
    );
}
