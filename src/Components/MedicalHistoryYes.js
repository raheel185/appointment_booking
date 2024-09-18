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
import { states } from "../Screens/states";
import { addMedicalHistory2 } from "../PHP/ApiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function createData(name, data1, data2, data3, data4, data5, data6) {
  return { name, data1, data2, data3, data4, data5, data6 };
}

const rows = [
  createData("Cigarette # Of Years", "BP_1", "BP_2", "BP_3"),
  createData("Cigarette #Per day?", "CH_1", "CH_2", "CH_3"),
  createData("Date of Last Cigarette", "DWD_1", "DWD_2", "DWD_3"),
  createData("Do you or have you ever smoked?", "HL_1", "HL_2", "HL_3"),
  createData("Have you ever had Diphtheria", "MD_1", "MD_2", "MD_3"),
  createData("Have you ever had Drug, Narcotics Habit", "RE_1", "RE_2", "RE_3"),
  createData("Have you ever had Frequent Colds", "BP_7", "BP_8", "BP_9"),
  createData("Have you ever had Heart Attack", "CH_7", "CH_8", "CH_9"),
  createData("Have you ever had Heart Murmur", "DWD_7", "DWD_8", "DWD_9"),
  createData("Have you ever had Kidney Stones", "HL_7", "HL_8", "HL_9"),
  createData("Have you ever had Rheumatic Fever", "MD_7", "MD_8", "MD_9"),
  createData("Have you ever had Scarlet Fever", "RE_7", "RE_8", "RE_9"),
  createData("Have you ever had Sinusitis", "BP_13", "BP_14", "BP_15"),
  createData("Have you ever had Tuberculosis", "CH_13", "CH_14", "CH_15"),
  createData(
    "Have you ever had Venereal Disease",
    "DWD_13",
    "DWD_14",
    "DWD_15"
  ),
  createData("Have you ever had Wear Glasses", "HL_13", "HL_14", "HL_15"),
];

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
  },
};

const MedicalHistoryYes = ({ setCurrentStep }) => {
  const nav = useNavigate();
  const [sex, setSex] = useState("");
  const [sex2, setSex2] = useState("");
  const [form1, showForm1] = useState(false);
  const [form2, showForm2] = useState(false);
  const [insuredRelation, setInsurance2] = useState("");
  const { isAuthenticated, status, error, user } = useSelector(
    (state) => state.auth
  );
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
    nav("/");
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };
  const handleSexChange2 = (event) => {
    setSex2(event.target.value);
  };
  const handleInsuranceRelationChange = (event) => {
    setInsurance2(event.target.value);

    if (event.target.value == "Self") {
      showForm1(true);
      showForm2(false);
    } else {
      showForm2(true);
      showForm1(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("patient_id", user.id);

    console.log(data);

    addMedicalHistory2(data)
      .then((response) => {
        console.log(response);
        setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ins_container">
      <div className="form_inner">
        <div>
          <h3>Medical History Form Part(2)</h3>
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
                      Medical History Yes No
                    </TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Yes</TableCell>
                    <TableCell align="right">No</TableCell>
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

      {/* Popup */}
      {showPopup && (
        <div class="popup_alert" style={popupStyles.overlay}>
          <div style={popupStyles.popup}>
            <h2>Form Submitted</h2>
            <p>All Data Submitted Successfully</p>

            <button onClick={closePopup}>Return Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryYes;
