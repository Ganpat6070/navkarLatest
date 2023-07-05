import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { authenticateUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setmessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(async (data) => {
                try {
                  const response = await dispatch(
                    authenticateUserAsync({
                      email: data.email,
                      password: data.password,
                    })
                  );

                  console.log("res", response);
                  const resStatus = response.payload.statusCode;
                  console.log("status", resStatus);
                  if (resStatus === 200) {
                    // Login successful, navigate to the desired page
                    navigate("/table");
                  } else if (resStatus === 400) {
                    console.log("error", response.payload.message);
                    setErrorMessage(response.payload.message);
                  } else {
                    console.log("Unknown error occurred");
                    setErrorMessage("Unknown error occurred");
                  }
                } catch (error) {
                  console.error(error);
                }
              })}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Please enter a valid email address",
                  },
                })}
                autoFocus
              />
              {errors.email && errors.email.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters`,
                  },
                })}
                label="Password"
                type="password"
                id="password"
              />
              {errors.password && errors.password.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {errorMessage ? (
                <span style={{color: 'red'}}>{errorMessage}</span>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
