import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", token: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: hook up real login logic
        navigate("/dashboard");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "row",
            }}
        >
            {/* Left Form Section */}
            <Box
                sx={{
                    flex: 1,
                    p: 5,
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    bgcolor: "white",
                }}
            >
                {/* Logo */}
                <Box mb={3}>
                    <img src="/assets/lotuslogo.png" alt="Lotus Bank" height={40} />
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom color="black">
                    Welcome to LOTUS-EDGE Control Center
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Enter your Active Directory credentials to access the admin console
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Token"
                        name="token"
                        type="text"
                        value={form.token}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <FormControlLabel
                        control={<Checkbox />}
                        label={
                            <Typography sx={{ color: "black" }}>
                                Remember Me
                            </Typography>
                        }
                        sx={{ mt: 1 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            bgcolor: "teal.500",
                            "&:hover": { bgcolor: "teal.600" },
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        Login
                    </Button>
                </form>

                {/* Footer */}
                <Box
                    mt={5}
                    display="flex"
                    justifyContent="space-between"
                    color="text.secondary"
                    fontSize={12}
                >
                    <Typography>© 2025 LOTUS Bank All rights reserved</Typography>
                    <Typography sx={{ cursor: "pointer" }}>Privacy Policy</Typography>
                </Box>
            </Box>

            {/* Right Illustration Section */}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: "url(/assets/bluebackground.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    color: "white",
                    p: 5,
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box maxWidth={300} textAlign="center">
                    <img
                        src="/assets/loginimages.png"
                        alt="Illustration"
                        style={{marginBottom: 0}}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        One Platform to Manage All Payments
                    </Typography>
                    <Typography variant="body2" color="white" mb={3}>
                        Managing all your payments and workflows on one unified platform —
                        fully aligned with your enterprise goals.
                    </Typography>
                    <img
                        src="/assets/peopledem.png"
                        alt="Illustration"
                        style={{marginBottom: 24}}
                    />
                    <Typography variant="h5" fontWeight="bold">
                        <CountUp start={0} end={500000} duration={3} separator=","/>+
                    </Typography>
                    <Typography variant="body2">Happy Businesses</Typography>
                </Box>
            </Box>
        </Box>
    );
}
