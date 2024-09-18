import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { addMedicalHistory1 } from "../PHP/ApiCalls";
import { useSelector } from "react-redux";

function createData(name, data1, data2, data3, data4, data5, data6) {
  return { name, data1, data2, data3, data4, data5, data6 };
}

const rows = [
  createData("Ankle Swelling", "AS_1", "AS_2", "AS_3", "AS_4"),
  createData("CARDIOVASCULAR", "CV_1", "CV_2", "CV_3", "CV_4"),
  createData("Chest Pain/Pressure", "CP_1", "CP_2", "CP_3", "CP_4"),
  createData("Cough", "C_1", "C_2", "C_3", "C_4"),
  createData("Cough w/Blood", "CB_1", "CB_2", "CB_3", "CB_4"),
  createData("Dizziness", "D_1", "D_2", "D_3", "D_4"),
  createData("Fainting Spells", "FS_1", "FS_2", "FS_3", "FS_4"),
  createData("High Blood Pressure", "HBP_1", "HBP_2", "HBP_3", "HBP_4"),
  createData("Irregular Heart Beat", "IHB_1", "IHB_2", "IHB_3", "IHB_4"),
  createData("Rapid Heart Beat", "RHB_1", "RHB_2", "RHB_3", "RHB_4"),
  createData("RESPIRATORY", "R_1", "R_2", "R_3", "R_4"),
  createData(
    "Shortness of Breath w/Normal Activity",
    "SOB_1",
    "SOB_2",
    "SOB_3",
    "SOB_4"
  ),
];

const MedicalHistory = ({ setCurrentStep }) => {
  const { isAuthenticated, status, error, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("patient_id", user.id);

    console.log(data);

    addMedicalHistory1(data)
      .then((response) => {
        if (response.status === "success") {
          setCurrentStep((prevStep) => prevStep + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ins_container">
      <div className="form_inner">
        <div>
          <h3>Medical History Form Part(1)</h3>
          <p>
            Simply define your services and providers, display their
            availability, and you will have clients both old and new making
            bookings 24/7.
          </p>
        </div>

        <div className="notes_form">
          <Box className="form" onSubmit={handleSubmit} component="form">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className="tableHeads">
                  <TableRow>
                    <TableCell className="thMain" colSpan={4}>
                      Medical History No mild often
                    </TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">No</TableCell>
                    <TableCell align="right">Mild</TableCell>
                    <TableCell align="right">Often</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell colSpan={4} component="th" scope="row">
                        {row.name}
                        <TextField
                          className="hidden_text_fields"
                          type="hidden"
                          name={row.data1 + "name"}
                          value={row.name}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField name={row.data1} />
                      </TableCell>
                      <TableCell align="right">
                        <TextField name={row.data2} />
                      </TableCell>
                      <TableCell align="right">
                        <TextField name={row.data3} />
                      </TableCell>
                      <TableCell align="right">
                        <TextField name={row.data4} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br></br>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
