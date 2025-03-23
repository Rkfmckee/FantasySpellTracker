import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../components/form/LoadingButton";
import { register } from "../../services/AuthService";
import Button from "@mui/material/Button";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordsDontMatch = confirmPassword ? password != confirmPassword : false;

    const {
        mutate: createAccount,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: register,
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
                    Create an account
                </Typography>

                {isError && (
                    <Box>
                        <Typography variant="body1" color="error">
                            {error?.message || "There was a problem, please try again"}
                        </Typography>
                    </Box>
                )}

                {passwordsDontMatch && (
                    <Box>
                        <Typography variant="body1" color="error">
                            'Password' and 'Confirm Password' must match
                        </Typography>
                    </Box>
                )}

                <Stack spacing={3}>
                    <TextField id="username" label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField id="password" label="Password" variant="standard" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        variant="standard"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && createAccount({ username, password })}
                    />

                    <LoadingButton
                        text="Register"
                        loadingText="Registering"
                        loading={isPending}
                        disabled={!username || !password || !confirmPassword || passwordsDontMatch}
                        onClick={() => createAccount({ username, password })}
                    />

                    <span>
                        Already have an account?
                        <Button component={Link} to="/login">
                            Login
                        </Button>
                    </span>
                </Stack>
            </Paper>
        </>
    );
};

export default Register;
