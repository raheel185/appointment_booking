import React, { useState } from "react";
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../PHP/ApiCalls";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../auth/authSlice";

const theme = createTheme();

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error"); // 'error' or 'success'
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = {
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    setInputs((prev) => {
      return { ...prev, ...input };
    });

    signup(input)
      .then((response) => {
        if (response.status != "fail") {
          setMessage(
            "Registration Successfull, Please check you email for verfication."
          );
          setShowVerification(true); // Show verification input
        }
        if (response.status == "fail") {
          setMessage(response.message);
        }

        setSeverity("success");
      })
      .catch((error) => {
        setMessage(error.message);
        setSeverity("error");
      });
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:80/api/verify", {
        params: { email: input.email, code: verificationCode },
      });

      if (response.data.status == "success") {
        console.log(response);

        const input2 = {
          email: input.email,
          password: input.password,
        };

        setMessage(response.data.message);
        setSeverity("success");
        dispatch(login(input2));
        setTimeout(() => {
          navigate("/Notesform"); // Redirect to homepage
        }, 1000);
      }
      if (response.data.status == "fail") {
        console.log(response);
        setMessage(response.data.message);
        // setSeverity("success");
      }
    } catch (error) {
      setMessage("Verification failed, please try again.");
      setSeverity("error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {message && (
            <Alert severity={severity} sx={{ width: "100%", mt: 2 }}>
              {message}
            </Alert>
          )}
          {!showVerification ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="given-name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText="Password must be at least 8 characters long"
              />
              <FormControlLabel
                required
                control={<Checkbox value="agree" color="primary" />}
                label="I agree to the Terms and Conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to={"/Login"}
                    variant="body4"
                    style={{
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      color: "blue",
                    }}
                  >
                    Already have an account? Sign In
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleVerifyCode} sx={{ mt: 1 }}>
              <Typography component="h1" variant="h6">
                Enter the 6-digit verification code sent to your email
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="verification_code"
                label="Verification Code"
                name="verification_code"
                autoFocus
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify Code
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
