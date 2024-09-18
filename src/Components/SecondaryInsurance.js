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
import { states } from "../Screens/states";
import { addInsuranceInfo } from "../PHP/ApiCalls";
import { useSelector } from "react-redux";

const SecondayInsurance = ({ formData, setCurrentStep }) => {
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

    addInsuranceInfo(data)
      .then((response) => {
        setCurrentStep((prevStep) => prevStep + 1);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ins_container">
      <div className="form_inner">
        <div>
          <h3>Seconday Insurance</h3>
          <p>
            All required fields are marked with an asterisk (*). Your
            information is secure and used only for this quote.
          </p>
        </div>

        <div className="notes_form">
          <Box className="form" onSubmit={handleSubmit} component="form">
            <div className="insform_div1">
              <h4>Insurance Card</h4>
              <TextField
                type="file"
                name="insurance_file"
                className="insurance_file"
              />
              <br></br>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Patient Insured Relation
                </FormLabel>
                <RadioGroup
                  aria-label="patient_insured_relation"
                  name="insuredrelation"
                  value={insuredRelation}
                  onChange={handleInsuranceRelationChange}
                  row
                >
                  <FormControlLabel
                    value="Self"
                    control={<Radio />}
                    label="Self"
                  />
                  <FormControlLabel
                    value="Spouse"
                    control={<Radio />}
                    label="Spouse"
                  />
                  <FormControlLabel
                    value="Child"
                    control={<Radio />}
                    label="Child"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="ins_main_fields">
              <TextField
                name="planname"
                label="Plan Name"
                variant="outlined"
                required
              />
              <TextField
                name="policynumber"
                label="Group/Policy #"
                variant="outlined"
              />
              <TextField
                name="memberID"
                label="Member ID"
                variant="outlined"
                required
              />
              <TextField name="copay" label="Copay" variant="outlined" />
            </div>

            {form1 && (
              <div className="ins_form1">
                <h3>Insured</h3>
                <div className="names_div">
                  <TextField
                    name="last_name"
                    id="last_name"
                    label="Last Name"
                    variant="outlined"
                    value={formData.get("last_name")}
                  />
                  <TextField
                    name="first_name"
                    id="first_name"
                    label="First Name"
                    variant="outlined"
                    value={formData.get("first_name")}
                  />

                  <TextField
                    name="mi_name"
                    id="mi_name"
                    label="MI"
                    variant="outlined"
                    value={formData.get("mi_name")}
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
                    value={formData.get("dob")}
                  />

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup
                      aria-label="sex"
                      name="sex"
                      value={sex || formData.get("sex")}
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
                    value={formData.get("nickname")}
                  />
                </div>

                <TextField
                  id="address"
                  label="Address"
                  variant="outlined"
                  name="address"
                  fullWidth
                  value={formData.get("address")}
                />

                <div className="names_div names_div2">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select your state"
                    name="states"
                    value={formData.get("states")}
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
                    value={formData.get("city")}
                  />

                  <TextField
                    name="zipcode"
                    id="zipcode"
                    label="Zipcode"
                    variant="outlined"
                    value={formData.get("zipcode")}
                  />
                </div>
              </div>
            )}

            {form2 && (
              <div class="emg_fields ins_form2">
                <h3>Insured</h3>
                <div class="emg_inner">
                  <TextField
                    name="lastname2"
                    label="Last Name"
                    variant="outlined"
                  />
                  <TextField
                    name="firstname2"
                    label="First Name"
                    variant="outlined"
                  />
                  <TextField
                    name="middlename2"
                    label="Middle"
                    variant="outlined"
                  />
                  <TextField
                    id="date-of-birth"
                    label="DOB"
                    type="date"
                    name="dob2"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup
                      aria-label="sex"
                      name="sex2"
                      value={sex2}
                      onChange={handleSexChange2}
                      row
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="M"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="F"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            )}

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

export default SecondayInsurance;
