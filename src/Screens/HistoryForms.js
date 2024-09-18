import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles2.css";

import FormSteps from "../Components/FormSteps2";
import FamilyHistory from "../Components/FamilyHistory";
import MedicalHistory from "../Components/MedicalHistory";
import MedicalHistoryYes from "../Components/MedicalHistoryYes";
import { addCurrentCondition } from "../PHP/ApiCalls";

function HistoryForms() {
  const nav = useNavigate();
  const [sex, setSex] = useState("male");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [insurance, setInsurance] = useState("uninsured");
  const [isSuccess, setIsSuccess] = useState(false);
  const [conditionRows, setConditionRows] = useState([]); // New state for dynamic rows
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Fetch patient information
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/getCurrentCondition/`, {
          params: { patient_id: user.id },
        });
        if (response.data.status === "success") {
          // Set the fetched data to the conditionRows state
          setConditionRows(response.data.data);
        } else {
          console.log("Failed to fetch patient info");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchPatientInfo();
  }, [user.id]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("patient_id", user.id);

    addCurrentCondition(data)
      .then((response) => {
        if (response.status === "success") {
          setCurrentStep((prevStep) => prevStep + 1);
          setIsSuccess(true);
        }
      })
      .catch((error) => {
        console.log("Submit error:", error);
      });
  };

  return (
    <div className="Notes_Form_Main MedicalHistoryForms">
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
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead className="tableHeads">
                      <TableRow>
                        <TableCell className="thMain1" colSpan={10}>
                          Current Condition
                        </TableCell>
                        <TableCell align="right">Yes</TableCell>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="right">For how long</TableCell>
                        <TableCell align="right">Rx</TableCell>
                        <TableCell align="right">Rx History</TableCell>
                        <TableCell align="right">Note</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conditionRows.map((row, index) => (
                        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell colSpan={10} component="th" scope="row">
                            {row.CurrentCondition}
                            <TextField className="hidden_text_fields" type="hidden" name={`condition_${index}_name`} value={row.CurrentCondition} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_yes`} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_no`} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_duration`} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_rx`} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_rx_history`} />
                          </TableCell>
                          <TableCell align="right">
                            <TextField name={`condition_${index}_note`} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
                  Submit
                </Button>
              </Box>
            </div>
          </div>
        )}

        {currentStep === 1 && isSuccess && (
          <FamilyHistory className="Primary_Insurance_Form" setCurrentStep={setCurrentStep} />
        )}

        {currentStep === 2 && (
          <MedicalHistory className="Primary_Intake_Form" setCurrentStep={setCurrentStep} />
        )}

        {currentStep === 3 && (
          <MedicalHistoryYes className="Primary_Intake_Form" setCurrentStep={setCurrentStep} />
        )}
      </div>
    </div>
  );
}

export default HistoryForms;
