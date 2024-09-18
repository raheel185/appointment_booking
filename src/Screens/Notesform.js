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
} from "@mui/material";
import { states } from "./states";
import "../styles2.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotes } from "../PHP/ApiCalls";
import InsuranceForm from "../Components/InsuranceForm";
import FormSteps from "../Components/FormSteps";
import Intakeform from "../Components/Intakeform";
import SecondayInsurance from "../Components/SecondaryInsurance";

function Notesform() {
  const nav = useNavigate();
  const [sex, setSex] = useState("male");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [insurance, setInsurance] = useState("uninsured");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSecondayInsurance, setSecondayInsuracne] = useState(false);
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
    setFormData(data);

    const input = {
      user_id: user.id,
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      mi_name: data.get("mi_name"),
      nickname: data.get("nickname"),
      dob: data.get("dob"),
      age: data.get("age"),
      sex: data.get("sex"),
      address: data.get("address"),
      states: data.get("states"),
      city: data.get("city"),
      zipcode: data.get("zipcode"),
      telephone: data.get("telephone"),
      cellphone: data.get("cellphone"),
      workphone: data.get("workphone"),
      ext: data.get("ext"),
      insurance: data.get("insurance"),
      emg_lastname: data.get("emg_lastname"),
      emg_firstname: data.get("emg_firstname"),
      emg_relationship: data.get("emg_relationship"),
      emg_phone: data.get("emg_phone"),
    };

    addNotes(input)
      .then((response) => {
        console.log(response);

        if (response.status == "success") {
          // setCurrentStep((prevStep) => prevStep + 1);
          // once_insurance
          if (input.insurance == "once_insurance") {
            setCurrentStep((prevStep) => prevStep + 1);
            // setIsSuccess(true);
          }
          if (input.insurance == "two_insurance") {
            setCurrentStep((prevStep) => prevStep + 1);
            //  setSecondayInsuracne(true);
          }
          if (input.insurance == "uninsured") {
            setCurrentStep((prevStep) => prevStep + 2);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="Notes_Form_Main">
      <h1 className="mainTitleForms">Calendar Note Forms</h1>
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="Notes_form_container">
        {currentStep === 0 && (
          <div>
            {currentStep === 0 && (
              <div className="form_inner">
                <div>
                  <h3>Demographic Form</h3>
                  <p>
                    Simply define your services and providers, display their
                    availability, and you will have clients both old and new
                    making bookings 24/7.
                  </p>
                </div>

                <div className="notes_form">
                  <Box
                    className="form"
                    onSubmit={handleSubmit}
                    component="form"
                  >
                    <div className="names_div">
                      <TextField
                        name="first_name"
                        id="first_name"
                        label="First Name"
                        variant="outlined"
                      />
                      <TextField
                        name="last_name"
                        id="last_name"
                        label="Last Name"
                        variant="outlined"
                      />
                      <TextField
                        name="mi_name"
                        id="mi_name"
                        label="MI"
                        variant="outlined"
                      />
                    </div>

                    <div className="fields_row2">
                      {/* Date of Birth Field */}
                      <TextField
                        id="date-of-birth"
                        label="DOB"
                        type="date"
                        name="dob"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        id="age_name"
                        label="Age"
                        type="number"
                        variant="outlined"
                        name="age"
                      />

                      <FormControl component="fieldset">
                        <FormLabel component="legend">Sex</FormLabel>
                        <RadioGroup
                          aria-label="sex"
                          name="sex"
                          value={sex}
                          onChange={handleSexChange}
                          row
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>

                      <TextField
                        id="nick_name"
                        name="nickname"
                        label="Nick name"
                        variant="outlined"
                      />
                    </div>

                    <TextField
                      id="address"
                      label="Address"
                      variant="outlined"
                      name="address"
                      fullWidth
                    />

                    <div className="names_div names_div2">
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        defaultValue="EUR"
                        helperText="Please select your state"
                        name="states"
                      >
                        {states.map((state) => (
                          <MenuItem key={state.value} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        name="city"
                        id="city"
                        label="City"
                        variant="outlined"
                      />

                      <TextField
                        name="zipcode"
                        id="zipcode"
                        label="Zipcode"
                        variant="outlined"
                      />
                    </div>

                    <div className="numders_div">
                      <TextField
                        name="telephone"
                        id="telephone"
                        label="Home Phone"
                        type="tel"
                      />
                      <TextField
                        name="cellphone"
                        id="cellphone"
                        label="Cell Phone"
                        type="tel"
                      />
                      <TextField
                        name="workphone"
                        id="workphone"
                        label="Work Phone"
                        type="tel"
                      />

                      <TextField
                        name="ext"
                        id="ext_dot"
                        label="Ext."
                        type="text"
                      />
                    </div>

                    {/* Insurance Radio Group */}
                    <FormControl component="fieldset" margin="normal">
                      <FormLabel component="legend">
                        Do you have insurance?
                      </FormLabel>
                      <RadioGroup
                        aria-label="insurance"
                        name="insurance"
                        value={insurance}
                        onChange={handleInsuranceChange}
                        row
                      >
                        <FormControlLabel
                          value="uninsured"
                          control={<Radio />}
                          label="Uninsured"
                        />
                        <FormControlLabel
                          value="once_insurance"
                          control={<Radio />}
                          label="Once insurance"
                        />
                        <FormControlLabel
                          value="two_insurance"
                          control={<Radio />}
                          label="Two insurance"
                        />
                      </RadioGroup>
                    </FormControl>

                    <div class="emg_fields">
                      <h3>Emergency Contact</h3>
                      <div class="emg_inner">
                        <TextField
                          name="emg_firstname"
                          label="First Name"
                          variant="outlined"
                        />
                        <TextField
                          name="emg_lastname"
                          label="Last Name"
                          variant="outlined"
                        />
                        <TextField
                          name="emg_relationship"
                          label="Relationship"
                          variant="outlined"
                        />
                        <TextField
                          name="emg_phone"
                          label="Phone"
                          variant="outlined"
                          type="tel"
                        />
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
            )}
          </div>
        )}

        {currentStep === 1 && !isSecondayInsurance && (
          <InsuranceForm
            formData={formData}
            className="Primary_Insurance_Form"
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 1 && isSecondayInsurance && (
          <SecondayInsurance
            formData={formData}
            className="Primary_Insurance_Form"
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 2 && (
          <Intakeform
            className="Primary_Intake_Form"
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}

export default Notesform;
