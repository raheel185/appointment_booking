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
import { states } from "./states";
import "../styles2.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCurrentCondition } from "../PHP/ApiCalls";

import FormSteps from "../Components/FormSteps2";
import Intakeform from "../Components/Intakeform";
import FamilyHistory from "../Components/FamilyHistory";
import MedicalHistory from "../Components/MedicalHistory";
import MedicalHistoryYes from "../Components/MedicalHistoryYes";

function createData(name, data1, data2, data3, data4, data5, data6) {
  return { name, data1, data2, data3, data4, data5, data6 };
}

const rows = [
  createData(
    "Balance Problems",
    "BP_1",
    "BP_2",
    "BP_3",
    "BP_4",
    "BP_5",
    "BP_6"
  ),
  createData(
    "Change in Handwriting",
    "CH_1",
    "CH_2",
    "CH_3",
    "CH_4",
    "CH_5",
    "CH_6"
  ),
  createData(
    "Difficulty Walking in the Dark",
    "DWD_1",
    "DWD_2",
    "DWD_3",
    "DWD_4",
    "DWD_5",
    "DWD_6"
  ),
  createData("Hearing Loss", "HL_1", "HL_2", "HL_3", "HL_4", "HL_5", "HL_6"),
  createData("Memory Defect", "MD_1", "MD_2", "MD_3", "MD_4", "MD_5", "MD_6"),
  createData(
    "Ringing in the Ears",
    "RE_1",
    "RE_2",
    "RE_3",
    "RE_4",
    "RE_5",
    "RE_6"
  ),
];

function HistoryForms() {
  const nav = useNavigate();
  const [sex, setSex] = useState("male");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [insurance, setInsurance] = useState("uninsured");
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAuthenticated, status, error, user } = useSelector(
    (state) => state.auth
  );

  console.log(currentStep, "kkkk");

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleInsuranceChange = (event) => {
    setInsurance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("patient_id", user.id);

    // console.log(data);

    addCurrentCondition(data)
      .then((response) => {
        if (response.status == "success") {
          setCurrentStep((prevStep) => prevStep + 1);
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="Notes_Form_Main MedicalHistoryForms">
      <h1 className="mainTitleForms">History & Conditions forms</h1>
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="Notes_form_container">
        {!isSuccess && (
          <div className="form_inner">
            <div>
              <h3>Current Condition</h3>
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
                        <TableCell className="thMain1" colSpan={10}>
                          Current Condition
                        </TableCell>
                        <TableCell align="right">Yes</TableCell>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="right">For how long</TableCell>
                        <TableCell align="right">Rx</TableCell>
                        <TableCell align="right">Rx Histoy</TableCell>
                        <TableCell align="right">Note</TableCell>
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
                          <TableCell colSpan={10} component="th" scope="row">
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
                          <TableCell align="right">
                            <TextField name={row.data5} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={row.data6} />
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
        )}

        {currentStep === 1 && isSuccess && (
          <FamilyHistory
            className="Primary_Insurance_Form"
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 2 && (
          <MedicalHistory
            className="Primary_Intake_Form"
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <MedicalHistoryYes
            className="Primary_Intake_Form"
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}

export default HistoryForms;
