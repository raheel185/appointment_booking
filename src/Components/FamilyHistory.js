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
import { addFamilyHistory } from "../PHP/ApiCalls";
import { useSelector } from "react-redux";

function createData(name, data1, data2, data3, data4, data5, data6) {
  return { name, data1, data2, data3, data4, data5, data6 };
}

const rows = [
  createData("Cancer", "BP_1", "BP_2", "BP_3", "BP_4", "BP_5", "BP_6"),
  createData("Diabetes", "CH_1", "CH_2", "CH_3", "CH_4", "CH_5", "CH_6"),
  createData("Gout", "DWD_1", "DWD_2", "DWD_3", "DWD_4", "DWD_5", "DWD_6"),
  createData("Heart trouble", "HL_1", "HL_2", "HL_3", "HL_4", "HL_5", "HL_6"),
  createData("Strokes", "MD_1", "MD_2", "MD_3", "MD_4", "MD_5", "MD_6"),
  createData("Tuberculosis", "RE_1", "RE_2", "RE_3", "RE_4", "RE_5", "RE_6"),
];

const FamilyHistory = ({ setCurrentStep }) => {
  const [sex, setSex] = useState("");
  const [sex2, setSex2] = useState("");
  const [form1, showForm1] = useState(false);
  const [form2, showForm2] = useState(false);
  const [insuredRelation, setInsurance2] = useState("");
  const { isAuthenticated, status, error, user } = useSelector(
    (state) => state.auth
  );

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

    addFamilyHistory(data)
      .then((response) => {
        if (response.status == "success") {
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
          <h3>Family History</h3>
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
                      Family History
                    </TableCell>
                    <TableCell align="right">Yes</TableCell>
                    <TableCell align="right">No</TableCell>
                    <TableCell align="right">Relationship</TableCell>
                    <TableCell align="right">Operations</TableCell>
                    <TableCell align="right">Operations age</TableCell>
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
    </div>
  );
};

export default FamilyHistory;
