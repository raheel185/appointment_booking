import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  Typography,
  message,
  Spin,
} from "antd";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const { Option } = Select;
const { Title } = Typography;

const painScaleOptions = [
  "0:Normal",
  "1:Trace",
  "2:Minimal",
  "3:Mild",
  "4:Slight",
  "5:Medium",
  "6:Moderate",
  "7:Strong",
  "8:Severe",
  "9:Horrible",
  "10:Extreme",
];

const painTypesOptions = [
  "sharp",
  "stabbing",
  "burning",
  "dull",
  "shooting",
  "radiating",
  "tingling",
  "stiffness",
  "numbness",
  "paresthesia",
  "aching",
  "piercing",
  "constant",
  "others",
];

const bodyPartsOptions = ["Head", "Neck", "Shoulder", "Back", "Legs", "Arms"];

const IntakeForm = () => {
  const user = useSelector((state) => state.auth.user);
  const patientId = user.id;
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://localhost:80/api/getPatientIntake/`, {
          params: { patient_id: patientId },
        })
        .then((response) => {
          if (response.data.status == "error") {
            setFirstTime(true);
            setLoading(false);
          } else {
            setFirstTime(false);
            setLoading(false);
          }

          const responseData = response.data.data;
          responseData.painScale = painScaleOptions[responseData.painScale];

          form.setFieldsValue({ ...responseData });
          setFormValues(responseData);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching patient intake information:", error);
          message.error("Failed to fetch patient intake information");
        });
    }
  }, [patientId, form]);

  useEffect(() => {
    if (!isEditing) {
      form.setFieldsValue(formValues);
    }
  }, [isEditing, formValues, form]);

  const onFinish = (values) => {
    console.log("Form values on submit:", values);
    const apiCall = !firstTime
      ? axios.post(`http://localhost:80/api/updatePatientIntake/`, {
          ...values,
          patient_id: patientId,
        })
      : axios.post(`http://localhost:80/api/insertPatientIntake/`, {
          ...values,
          patient_id: patientId,
        });

    apiCall
      .then((response) => {
        console.log("API response:", response.data);
        message.success("Patient intake information saved successfully");
        setIsEditing(false);
        setFormValues(values);
      })
      .catch((error) => {
        console.error("Error saving patient intake information:", error);
        message.error("Failed to save patient intake information");
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue(formValues);
    setIsEditing(false);
  };

  if (loading)
    return (
      <Spin
        style={{ position: "fixed", top: "50%", left: "50%" }}
        spinning
        size="large"
      />
    );

  return (
    <div
      style={{
        maxWidth: "70vw",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2}>Intake Form</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="chiefComplaint"
          label="Chief Complaint"
          rules={[
            { required: true, message: "Please input your chief complaint!" },
          ]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="conditionDuration"
          label="How long have you had this condition?"
          rules={[
            {
              required: true,
              message: "Please input the duration of your condition!",
            },
          ]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="painScale"
          label="Pain Scale"
          rules={[
            { required: true, message: "Please select your pain scale!" },
          ]}
        >
          {isMobile ? (
            <Select disabled={!isEditing}>
              {painScaleOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Radio.Group disabled={!isEditing}>
              {painScaleOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          name="painType"
          label="Pain Type"
          rules={[{ required: true, message: "Please select your pain type!" }]}
        >
          {isMobile ? (
            <Select mode="multiple" disabled={!isEditing}>
              {painTypesOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Checkbox.Group disabled={!isEditing}>
              {painTypesOptions.map((option) => (
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item
          name="siteOfPain"
          label="Site of Pain"
          rules={[
            { required: true, message: "Please select the site of your pain!" },
          ]}
        >
          {isMobile ? (
            <Select disabled={!isEditing}>
              {bodyPartsOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Radio.Group disabled={!isEditing}>
              {bodyPartsOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item name="painBetter" label="What makes the pain feel better?">
          <Checkbox.Group disabled={!isEditing}>
            <Checkbox value="heat">Heat</Checkbox>
            <Checkbox value="ice">Ice</Checkbox>
            <Checkbox value="rest">Rest</Checkbox>
            <Checkbox value="activity">Activity</Checkbox>
            <Checkbox value="medication">Medication</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="currentMedicalConditions"
          label="Current Medical Conditions"
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="pastMedicalConditions" label="Past Medical Conditions">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="familyHistory" label="Family History">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="currentInjuries" label="Current Injuries">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="pastInjuries" label="Past Injuries">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="allergies" label="Allergies">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="icd" label="ICD Code">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item style={{ width: "100%", textAlign: "end" }}>
          {isEditing ? (
            <>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="default"
              style={{
                fontWeight: "bold",
                width: "100%",
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default IntakeForm;
