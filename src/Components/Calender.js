import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography, TextField, Grid } from "@mui/material";
import { StaticDatePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BsArrowLeft } from "react-icons/bs";
import { useMediaQuery } from "@mui/material";

const Calendar = ({ title, providerName }) => {
  const nav = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const location = useLocation();
  const isDashboard = location.pathname === "/Dashboard";
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const unavailableDates = [
    new Date("2024-07-24"),
    new Date("2024-08-01"),
    new Date("2024-08-10"),
  ];

  const slotAvailable = {
    "2024-07-31": ["9:00 Am", "12:00 Pm", "6:00 Am", "10:00 Pm", "2:00 Am"],
    "2024-08-04": ["10:00 Pm", "1:00 Am", "4:00 Pm", "8:00 Am", "11:00 Pm"],
    "2024-08-11": ["11:00 Pm", "3:00 Am", "5:00 Pm", "9:00 Am", "12:00 Pm"],
  };

  const isDateAvailable = (date) => {
    const dateOnly = date.toISOString().split("T")[0];
    return !unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.toISOString().split("T")[0] === dateOnly
    );
  };

  const handleAppointment = (e) => {
    e.preventDefault();
    nav("/AppointmentForm", {
      state: { title, providerName, selectedDate, time: e.target.innerText },
    });
  };
  console.log(title, providerName);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split("T")[0];
    const times = slotAvailable[dateString] || [];
    setAvailableTimes(times);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      sx={[
        {
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100vh",
          gap: 2,
          p: 2,
        },
        !isDashboard
          ? { alignItems: "center", justifyContent: "center", width: "100vw" }
          : { width: "100%" },
      ]}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          sx={{
            backgroundColor: "transparent",
            borderWidth: 0,
            cursor: "pointer",
          }}
          onClick={() => nav("/")}
        >
          <BsArrowLeft />
        </Button>
        <Typography variant="h6">Select Time</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 1,
          maxWidth: "100%",
          p: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {isSmallScreen ? (
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => handleDateChange(newDate)}
              shouldDisableDate={(date) => !isDateAvailable(date)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                maxWidth: { xs: 200, md: 300 },
                width: "100%",
              }}
            />
          ) : (
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDate}
              onChange={(newDate) => handleDateChange(newDate)}
              shouldDisableDate={(date) => !isDateAvailable(date)}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                maxWidth: { xs: 200, md: 300 },
                width: "100%",
              }}
            />
          )}
        </LocalizationProvider>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Typography variant="body1">{formatDate(selectedDate)}</Typography>
          {availableTimes.length > 0 ? (
            <Grid container spacing={2} sx={{ maxWidth: 400 }}>
              {availableTimes.map((time, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    fullWidth
                    onClick={handleAppointment}
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        transition: "0.3s ease-out",
                      },
                    }}
                  >
                    {time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No slots Available
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
