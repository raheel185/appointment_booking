import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import React from "react";

const DialogComp = ({ open, onClose, appointment }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Appointment Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Appointment Date:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.appointment_date || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Appointment Time:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.appointment_time || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Appointment Notes:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={appointment?.appointment_notes || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Appointment Type:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.appointment_type || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Created At:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.created_at || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Phone:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.phone || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Provider:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={appointment?.provider || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComp;
