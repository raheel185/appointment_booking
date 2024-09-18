import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

const AppointmentForm = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const { title, providerName, selectedDate, time } = location.state;

  const [formData, setFormData] = useState({
    phone: "",
    appointmentNotes: "",
    address: "",
    appointmentDate: selectedDate,
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.phone = formData.phone ? "" : "Phone is required.";
    tempErrors.appointmentNotes = formData.appointmentNotes
      ? ""
      : "Appointment Notes are required.";
    tempErrors.address = formData.address ? "" : "Address is required.";
    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formattedTime = moment(time, "h:mm A").format("HH:mm:ss");
        const appointmentDateTime = `${formData.appointmentDate} ${formattedTime}`;

        const response = await axios.post(
          "http://localhost:80/api/createAppointment",
          {
            user_id: user.id,
            phone: formData.phone,
            appointment_time: formattedTime,
            provider: providerName,
            appointment_type: title,
            appointment_notes: formData.appointmentNotes,
            address: formData.address,
            appointment_date: formData.appointmentDate,
          }
        );

        if (response.data.status === "success") {
          setOpen(true);
        } else {
          setErrors({ form: response.data.message });
        }
        console.log(response.data);
      } catch (error) {
        setErrors({ form: "An error occurred. Please try again." });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    nav("/");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Book an Appointment
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={user?.first_name || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={user?.last_name || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={user?.email || ""}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Appointment Notes"
                name="appointmentNotes"
                value={formData.appointmentNotes}
                onChange={handleChange}
                error={!!errors.appointmentNotes}
                helperText={errors.appointmentNotes}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Provider Name"
                name="providerName"
                value={providerName}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Selected Date"
                name="selectedDate"
                value={formData.appointmentDate}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                value={time}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                margin="normal"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
            </Grid>
            {errors.form && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2" align="center">
                  {errors.form}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointment Created</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your appointment has been successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentForm;
