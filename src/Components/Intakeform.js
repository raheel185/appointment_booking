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
  TextareaAutosize,
  Checkbox,
} from "@mui/material";
import { addIntakeForm } from "../PHP/ApiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const options = [
  { id: "Sharp", label: "Sharp" },
  { id: "Stabbing", label: "Stabbing" },
  { id: "Burning", label: "Burning" },
  { id: "Dull", label: "Dull" },
  { id: "Shooting", label: "Shooting" },
  { id: "Radiating", label: "Radiating" },
  { id: "Tingling", label: "Tingling" },
  { id: "Stiffness", label: "Stiffness" },
  { id: "Numbness", label: "Numbness" },
  { id: "Paresthesia", label: "Paresthesia" },
  { id: "Aching", label: "Aching" },
  { id: "Piercing", label: "Piercing" },
  { id: "Constant", label: "Constant" },
  { id: "Others", label: "Others" },
];

const options2 = [
  { id: "Neck", label: "Neck" },
  { id: "Shoulder", label: "Shoulder" },
  { id: "Arms", label: "Arms" },
  { id: "Hands", label: "Hands" },
  { id: "Upper", label: "Upper" },
  { id: "Back", label: "Back" },
  { id: "MidBack", label: "MidBack" },
  { id: "LowBack", label: "LowBack" },
  { id: "Pelvis", label: "Pelvis" },
  { id: "Hips", label: "Hips" },
  { id: "Legs", label: "Legs" },
  { id: "Knees", label: "Knees" },
  { id: "Feet", label: "Feet" },
  { id: "Others", label: "Others" },
];

const options3 = [
  { id: "Heat", label: "Heat" },
  { id: "Pressure", label: "Pressure" },
  { id: "Movement", label: "Movement" },
  { id: "Cold", label: "Cold" },
  { id: "Massage", label: "Massage" },
  { id: "Rest", label: "Rest" },
];

const Intakeform = ({ formData, setCurrentStep }) => {
  const nav = useNavigate();
  const [sex, setSex] = useState("");
  const [checkedState, setCheckedState] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = false;
      return acc;
    }, {})
  );

  const [checkedState2, setCheckedState2] = useState(
    options2.reduce((acc, option) => {
      acc[option.id] = false;
      return acc;
    }, {})
  );

  const [checkedState3, setCheckedState3] = useState(
    options3.reduce((acc, option) => {
      acc[option.id] = false;
      return acc;
    }, {})
  );

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

  const handleChange = (event) => {
    const { id, checked } = event.target;
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleChange2 = (event) => {
    const { id, checked } = event.target;
    setCheckedState2((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };
  const handleChange3 = (event) => {
    const { id, checked } = event.target;
    setCheckedState3((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("patient_id", user.id);

    // Collecting selected options for Pain Type
    const selectedPainTypes = Object.keys(checkedState).filter(
      (key) => checkedState[key]
    );
    data.append("pain_type", JSON.stringify(selectedPainTypes));

    // Collecting selected options for Site of Pain
    const selectedSitesOfPain = Object.keys(checkedState2).filter(
      (key) => checkedState2[key]
    );
    data.append("site_of_pain", JSON.stringify(selectedSitesOfPain));

    // Collecting selected options for What makes your pain better
    const selectedPainRelief = Object.keys(checkedState3).filter(
      (key) => checkedState3[key]
    );
    data.append("pain_relief", JSON.stringify(selectedPainRelief));

    addIntakeForm(data)
      .then((response) => {
        if (response.status == "success") {
          console.log(response);
          setTimeout(() => {
            nav("/MedicalHistory"); // Redirect to homepage
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ins_container2">
      <div className="form_inner">
        <div>
          <h3>Intake Form</h3>
          <p>
            All required fields are marked with an asterisk (*). Your
            information is secure and used only for this quote.
          </p>
        </div>

        <div className="notes_form">
          <Box className="form" onSubmit={handleSubmit} component="form">
            <div className="insform_div1">
              <div className="textareadiv">
                <TextareaAutosize
                  name="Outlined"
                  placeholder="Chief Complaint"
                  variant="outlined"
                  className="textarea_cc"
                />
              </div>

              <div className="field_div">
                <TextField
                  name="condition_time"
                  label="How long have you had thing condition?"
                  variant="outlined"
                  required
                  fullWidth
                />
              </div>

              <FormControl component="fieldset">
                <FormLabel component="legend">Pain Scale</FormLabel>
                <RadioGroup
                  aria-label="pain_scale"
                  name="pain_scale"
                  value={insuredRelation}
                  onChange={handleInsuranceRelationChange}
                  row
                >
                  <FormControlLabel
                    value="Normal"
                    control={<Radio />}
                    label="Normal"
                  />
                  <FormControlLabel
                    value="Trace"
                    control={<Radio />}
                    label="Trace"
                  />
                  <FormControlLabel
                    value="Minimal"
                    control={<Radio />}
                    label="Minimal"
                  />
                  <FormControlLabel
                    value="Mild"
                    control={<Radio />}
                    label="Mild"
                  />
                  <FormControlLabel
                    value="Slight"
                    control={<Radio />}
                    label="Slight"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="Moderate"
                    control={<Radio />}
                    label="Moderate"
                  />
                  <FormControlLabel
                    value="Strong"
                    control={<Radio />}
                    label="Strong"
                  />
                  <FormControlLabel
                    value="Severe"
                    control={<Radio />}
                    label="Severe"
                  />
                  <FormControlLabel
                    value="Horrible"
                    control={<Radio />}
                    label="Horrible"
                  />
                  <FormControlLabel
                    value="Extreme"
                    control={<Radio />}
                    label="Extreme"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <FormControl className="checkboxes_int">
              <FormLabel component="legend">Pain Type</FormLabel>
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      id={option.id}
                      checked={checkedState[option.id]}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormControl>
            <br></br>
            <FormControl className="checkboxes_int">
              <FormLabel component="legend">Site of Pain</FormLabel>
              {options2.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      id={option.id}
                      checked={checkedState2[option.id]}
                      onChange={handleChange2}
                      color="primary"
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormControl>

            <br></br>
            <FormControl className="checkboxes_int">
              <FormLabel component="legend">
                What makes your pain better?
              </FormLabel>
              {options3.map((option) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      id={option.id}
                      checked={checkedState3[option.id]}
                      onChange={handleChange3}
                      color="primary"
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormControl>
            <br></br>

            <div className="field_div">
              <TextField
                name="cur_condition"
                label="Current Medical Conditions"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="field_div">
              <TextField
                name="past_condition"
                label="Past Medical Conditions"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="field_div">
              <TextField
                name="rel_family_history"
                label="Relevant Family History"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="field_div">
              <TextField
                name="curr_injuries"
                label="Current Injuries"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="field_div">
              <TextField
                name="past_injuries"
                label="Past Injuries"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="field_div">
              <TextField
                name="allergies"
                label="Allergies"
                variant="outlined"
                fullWidth
              />
            </div>

            <div class="ICD_div">
              <h3>ICD</h3>
              <div class="emg_inner">
                <TextField name="icd_field_1" label="" variant="outlined" />
                <TextField name="icd_field_2" label="" variant="outlined" />
                <TextField name="icd_field_3" label="" variant="outlined" />
                <TextField name="icd_field_4" label="" variant="outlined" />
              </div>
            </div>

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

export default Intakeform;
