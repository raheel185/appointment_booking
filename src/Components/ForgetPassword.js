import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../Styles/forgot.css";
import { getUser, changePassword } from "../PHP/ApiCalls";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [showChange, setShowChange] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmail = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmail(data.get("email"));
    getUser(email)
      .then((response) => {
        setName(response);
        if (response) {
          setShowChange(true);
        }
      })
      .catch(() => {
        setError("Email not found");
      });
  };

  const changePass = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newPass = data.get("newpassword");
    const confirmPass = data.get("newpasswordConfirm");

    if (!PASSWORD_REGEX.test(newPass)) {
      setPasswordError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    if (newPass !== confirmPass) {
      setPasswordError("Passwords do not match");
      return;
    }

    changePassword(email, newPass)
      .then((response) => {
        if (response) {
          setPasswordError("");
          nav("/Login");
        }
      })
      .catch(() => {
        setPasswordError("Failed to change password. Please try again.");
      });
  };

  return (
    <Box
      className="cont"
      component={"form"}
      onSubmit={showChange ? changePass : handleEmail}
    >
      {!showChange ? (
        <div className="inner">
          <h2 className="head">Forgot Password?</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="current-email"
          />
          {error && <p className="error" style={{fontSize:"0.75rem"}}>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </div>
      ) : (
        <div className="inner">
          <h2 className="head">Hi {name}</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newpassword"
            label="New Password"
            type="password"
            id="newpassword"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newpasswordConfirm"
            label="Confirm New Password"
            type="password"
            id="newpasswordConfirm"
          />
          {passwordError && <p className="error" style={{fontSize:"0.75rem"}}>{passwordError}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change
          </Button>
        </div>
      )}
    </Box>
  );
};

export default ForgetPassword;
