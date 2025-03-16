import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Login() {
    return (
        <>
            <Paper className="login-container">
                <Typography variant="h1" gutterBottom>
                    Login
                </Typography>
                <TextField id="username" label="Username" variant="standard" />
                <TextField id="password" label="Password" variant="standard" type="password" />
                <Button variant="contained" className="login-button">
                    Login
                </Button>
            </Paper>
        </>
    );
}
