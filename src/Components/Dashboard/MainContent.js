import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, message, Spin, Row, Col, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const MainContent = () => {
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [emergencyForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [hasInfo, setHasInfo] = useState(false);
  const [hasEmergencyInfo, setHasEmergencyInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient info
        const patientResponse = await axios.get(
          `http://localhost:8080/api/getPatientInfo/`,
          {
            params: { patient_id: user.id },
          }
        );
        if (patientResponse.data.status === "success") {
          form.setFieldsValue({
            ...patientResponse.data.data,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
          setHasInfo(true);
        } else {
          setHasInfo(false);
        }

        // Fetch emergency contact info
        const emergencyResponse = await axios.get(
          `http://localhost:8080/api/getEmergencyContacts/`,
          {
            params: { patient_id: user.id },
          }
        );
        if (emergencyResponse.data.status === "success") {
          emergencyForm.setFieldsValue(emergencyResponse.data.data);
          setHasEmergencyInfo(true);
        } else {
          setHasEmergencyInfo(false);
        }
      } catch (error) {
        message.error("Failed to fetch information");
      }
      setLoading(false);
    };

    fetchData();
  }, [user, form, emergencyForm]);

  const onFinish = async (values) => {
    try {
      const endpoint = hasInfo ? "updatePatientInfo" : "insertPatientInfo";
      const endpoint2 = hasEmergencyInfo
        ? "updateEmergencyContact"
        : "insertEmergencyContact";

      // Update or insert patient info
      const patientResponse = await axios.post(
        `http://localhost:8080/api/${endpoint}`,
        {
          patient_id: user.id,
          ...values,
        }
      );
      if (patientResponse.data.status === "success") {
        message.success("Patient info saved successfully");
        setHasInfo(true);
      } else {
        message.error(patientResponse.data.message);
      }

      // Update or insert emergency contact info
      const emergencyResponse = await axios.post(
        `http://localhost:8080/api/${endpoint2}`,
        {
          patient_id: user.id,
          ...emergencyForm.getFieldsValue(),
        }
      );
      console.log(emergencyResponse.data);
      if (emergencyResponse.data.status === "success") {
        message.success("Emergency contact saved successfully");
        setHasEmergencyInfo(true);
      } else {
        message.error(emergencyResponse.data.message);
      }

      setEditing(false);
    } catch (error) {
      message.error("Failed to save information");
    }
  };

  const onEdit = () => {
    setEditing(true);
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
      <h2 style={{ textAlign: "start", marginBottom: "20px" }}>
        Patient Information
      </h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        key={editing ? "editing" : "viewing"}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="First Name" name="first_name">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Last Name" name="last_name">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input disabled={!editing} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Sex"
              name="sex"
              rules={[{ required: true, message: "Please select your sex!" }]}
            >
              <Select disabled={!editing}>
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date of Birth"
              name="DOB"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <Input type="date" disabled={!editing} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nick Name"
              name="nick_name"
              rules={[
                { required: true, message: "Please input your nick name!" },
              ]}
            >
              <Input disabled={!editing} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea disabled={!editing} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please input your state!" }]}
            >
              <Input disabled={!editing} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input disabled={!editing} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="ZIP Code"
          name="zip"
          rules={[{ required: true, message: "Please input your ZIP code!" }]}
        >
          <Input disabled={!editing} />
        </Form.Item>
        <h2 style={{ textAlign: "start", marginBottom: "20px" }}>
          Emergency Contact
        </h2>
        <Form form={emergencyForm} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter First Name!",
                  },
                ]}
              >
                <Input disabled={!editing} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Last Name!",
                  },
                ]}
              >
                <Input disabled={!editing} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Relationship"
                name="relationship"
                rules={[
                  {
                    required: true,
                    message: "Please enter Relationship!",
                  },
                ]}
              >
                <Input disabled={!editing} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone!",
                  },
                ]}
              >
                <Input disabled={!editing} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {editing ? (
          <Form.Item style={{ textAlign: "end" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button type="default" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Form.Item>
        ) : (
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="default"
              onClick={onEdit}
              style={{
                fontWeight: "bold",
                width: "100%",
                borderColor: "#1890ff",
                color: "#1890ff",
              }}
            >
              Edit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default MainContent;
