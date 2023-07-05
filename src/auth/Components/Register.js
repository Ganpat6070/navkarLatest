import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { registerUserAsync, selectLoggedInUser } from "../authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

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
              User Registeration
            </Typography>
            {errorMessage && <p className="text-green-500">{errorMessage}</p>}
            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                const response = dispatch(
                  registerUserAsync({
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    password: data.password,
                  })
                );
                console.log("regResponse", response);
                navigate("/login");
              })}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                {...register("firstname", {
                  required: "First Name is required",
                })}
                autoFocus
              />
              {errors.firstname && errors.firstname.message && (
                <p style={{ color: "red" }}>{errors.firstname.message}</p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                {...register("lastname", {
                  required: "Last Name is required",
                })}
              />
              {errors.lastname && errors.lastname.message && (
                <p style={{ color: "red" }}>{errors.lastname.message}</p>
              )}
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
              />
              {errors.email && errors.email.message && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
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
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("confirmpassword", {
                  required: "Confirm password is required",
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "Password are not matching",
                })}
                label="Confirm password"
                type="password"
                id="confirmpassword"
              />
              {errors.confirmpassword && errors.confirmpassword.message && (
                <p style={{ color: "red" }}>{errors.confirmpassword.message}</p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have a account? Login Now"}
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
