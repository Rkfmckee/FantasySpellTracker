import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LoadingButton from "../../components/form/LoadingButton";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {
        mutate: logIn,
        isPending,
        isError,
    } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate("/", {
                // If they click the 'back' button, don't return to the login page
                replace: true,
            });
        },
    });

    return (
        <>
            <Paper className="login-container">
                <Typography variant="h2" gutterBottom>
                    Login
                </Typography>

                {isError && (
                    <Box>
                        <Typography variant="body1" color="error">
                            Invalid email or password
                        </Typography>
                    </Box>
                )}

                <Stack spacing={3}>
                    <TextField id="username" label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && logIn({ username, password })}
                    />

                    <Button className="mx-auto" component={Link} to="/password/forgot">
                        Forgot password?
                    </Button>
                    <LoadingButton text="Login" loadingText="Logging in" loading={isPending} disabled={!username || !password} onClick={() => logIn({ username, password })} />

                    <span>
                        Don't have an account?
                        <Button component={Link} to="/register">
                            Create one
                        </Button>
                    </span>
                </Stack>
            </Paper>
        </>
    );
}
