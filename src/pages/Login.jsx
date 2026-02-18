import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        px: 2,
      }}
    >
      {/* Shift container slightly left */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mr: { xs: 0, md: "100px" }, // 👈 moves slightly to left
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/assets/logo/logo.png"
            alt="ariive logo"
            sx={{ width: "60%", height: "600%" }}
          />
        </Box>

        {/* Titles */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ mb: 1, textAlign: "center" }}
        >
          Log in to your account
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#64748B",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="wave"
            sx={{
              height: 37,
              width: 39,
              ml: 0,
              display: "block",
            }}
          />
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Email */}
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Email
          </Typography>

          <TextField
            fullWidth
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#F5F7FB" // 👈 same color
                    : "#1e1e2f",
              },
            }}
          />

          {/* Password */}
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Password
          </Typography>

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#F5F7FB" // 👈 same color
                    : "#1e1e2f",
              },
            }}
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

          {/* Remember + Forgot */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.remember}
                  onChange={handleChange}
                  name="remember"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="#475569">
                  Remember me
                </Typography>
              }
            />

            <Typography
              variant="body2"
              sx={{
                color: "#1A4FB5",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 16,
              backgroundColor: "#065AD8",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#174EA6",
                boxShadow: "none",
              },
            }}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
