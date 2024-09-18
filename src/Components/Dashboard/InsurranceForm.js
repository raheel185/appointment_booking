import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Upload,
  message,
  Row,
  Col,
  Select,
  Switch,
  Spin,
  DatePicker,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

const InsuranceForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [secondaryForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [secondaryFileList, setSecondaryFileList] = useState([]);
  const [insuranceType, setInsuranceType] = useState("");
  const [secondaryInsuranceType, setSecondaryInsuranceType] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [showSecondaryForm, setShowSecondaryForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/getPatientInfo/`,
          { params: { patient_id: user.id } }
        );
        if (response.data.status === "success") {
          setPatientInfo(response.data);
        } else {
          message.error(
            response.data.message || "Failed to fetch patient info"
          );
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
        message.error("Failed to fetch patient info");
      } finally {
        setLoading(false);
      }
    };
    fetchPatientInfo();
  }, [user.id]);

  useEffect(() => {
    const fetchInsuranceInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:80/api/getInsuranceInfo/",
          {
            params: { patient_id: user.id },
          }
        );
        console.log(response.data);
        if (response.data.status === "success") {
          const insuranceData = response.data.data;
          form.setFieldsValue({
            relation: insuranceData.relation,
            planName: insuranceData.plan_name,
            groupPolicy: insuranceData.group_policy_number,
            memberId: insuranceData.member_id,
            firstName: insuranceData.first_name,
            lastName: insuranceData.last_name,
            middleName: insuranceData.middle_name,
            dob: insuranceData.dob,
            address: insuranceData.address,
            sex: insuranceData.sex,
          });
          const blob = new Blob([insuranceData.note_pdf], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(blob);
          setFileList([
            {
              uid: "-1",
              name: "Insurance Card.pdf",
              status: "done",
              url: url,
            },
          ]);
        } else {
          message.error(
            response.data.message || "Failed to fetch insurance info"
          );
        }
      } catch (error) {
        console.error("Error fetching insurance info:", error);
        message.error("Failed to fetch insurance info");
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceInfo();
  }, [user.id, form]);

  useEffect(() => {
    const fetchSecondaryInsuranceInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:80/api/getInsuranceInfoS/",
          {
            params: { patient_id: user.id },
          }
        );
        console.log("secondary: ", response.data);

        if (response.data.status === "success") {
          const insuranceData = response.data.data;
          secondaryForm.setFieldsValue({
            secondaryRelation: insuranceData.relation,
            secondaryPlanName: insuranceData.plan_name,
            secondaryGroupPolicy: insuranceData.group_policy_number,
            secondaryMemberId: insuranceData.member_id,
            secondaryFirstName: insuranceData.first_name,
            secondaryLastName: insuranceData.last_name,
            secondaryMiddleName: insuranceData.middle_name,
            secondaryDob: insuranceData.dob,
            secondaryAddress: insuranceData.address,
            secondarySex: insuranceData.sex,
          });
          const blob = new Blob([insuranceData.note_pdf], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(blob);
          setSecondaryFileList([
            {
              uid: "-1",
              name: "Insurance Card.pdf",
              status: "done",
              url: url,
            },
          ]);
        } else {
          message.error(
            response.data.message || "Failed to fetch secondary insurance info"
          );
        }
      } catch (error) {
        console.error("Error fetching secondary insurance info:", error);
        message.error("Failed to fetch secondary insurance info");
      } finally {
        setLoading(false);
      }
    };

    fetchSecondaryInsuranceInfo();
  }, [user.id, secondaryForm]);

  useEffect(() => {
    if (patientInfo) {
      const { DOB, sex } = patientInfo.data;
      const { first_name, last_name } = user;

      switch (insuranceType) {
        case "S1":
          form.setFieldsValue({
            firstName: first_name,
            lastName: last_name,
            dob: DOB,
            sex: sex,
          });
          break;
        case "S2":
          form.setFieldsValue({
            lastName: last_name,
            sex: sex === "M" ? "F" : "M",
            firstName: "",
            dob: "",
          });
          break;
        case "C":
          form.setFieldsValue({
            lastName: last_name,
            firstName: "", // Clear first name
            dob: "", // Clear date of birth
            sex: "", // Clear sex
          });
          break;
        default:
          form.resetFields(); // Clear all fields
          break;
      }
    }
  }, [patientInfo, insuranceType, user, form]);

  useEffect(() => {
    if (showSecondaryForm && patientInfo) {
      const { DOB, sex } = patientInfo.data;
      const { first_name, last_name } = user;

      switch (secondaryInsuranceType) {
        case "S1":
          secondaryForm.setFieldsValue({
            secondaryFirstName: first_name,
            secondaryLastName: last_name,
            secondaryDob: DOB,
            secondarySex: sex,
          });
          break;
        case "S2":
          secondaryForm.setFieldsValue({
            secondaryLastName: last_name,
            secondarySex: sex === "M" ? "F" : "M",
            secondaryFirstName: "", // Clear first name
            secondaryDob: "", // Clear date of birth
          });
          break;
        case "C":
          secondaryForm.setFieldsValue({
            secondaryLastName: last_name,
            secondaryFirstName: "", // Clear first name
            secondaryDob: "", // Clear date of birth
            secondarySex: "", // Clear sex
          });
          break;
        default:
          secondaryForm.resetFields([
            "secondaryFirstName",
            "secondaryLastName",
            "secondaryDob",
            "secondarySex",
          ]); // Clear secondary fields
          break;
      }
    }
  }, [
    secondaryInsuranceType,
    showSecondaryForm,
    patientInfo,
    user,
    secondaryForm,
  ]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSecondaryUploadChange = ({ fileList }) => {
    setSecondaryFileList(fileList);
  };

  const beforeUpload = (file) => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    const isLt5MB = file.size / 1024 / 1024 < 5;
    if (!isLt5MB) {
      message.error("File must be smaller than 5MB!");
    }
    return isPdf && isLt5MB;
  };

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("patient_id", user.id);
    formData.append("relation", values.relation);
    formData.append("plan_name", values.planName);
    formData.append("group_policy_number", values.groupPolicy);
    formData.append("member_id", values.memberId);
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("middle_name", values.middleName);
    formData.append("dob", values.dob);
    formData.append("address", values.address);
    formData.append("sex", values.sex);
    formData.append("note_pdf", fileList[0].originFileObj);
    formData.append("notetype", "Primary insurance");
    formData.append("insurance_type", "Primary");

    axios
      .post("http://localhost:80/api/insertInsuranceInfo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          message.success("Insurance info submitted successfully");
        } else {
          message.error(
            response.data.message || "Failed to submit insurance info"
          );
        }
      })
      .catch(() => {
        message.error("Failed to submit insurance info");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSecondaryFinish = (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("patient_id", user.id);
    formData.append("relation", values.secondaryRelation);
    formData.append("plan_name", values.secondaryPlanName);
    formData.append("group_policy_number", values.secondaryGroupPolicy);
    formData.append("member_id", values.secondaryMemberId);
    formData.append("first_name", values.secondaryFirstName);
    formData.append("last_name", values.secondaryLastName);
    formData.append("middle_name", values.secondaryMiddleName);
    formData.append("dob", values.secondaryDob);
    formData.append("address", values.secondaryAddress);
    formData.append("sex", values.secondarySex);
    formData.append("note_pdf", secondaryFileList[0].originFileObj);
    formData.append("notetype", "Secondary insurance");
    formData.append("insurance_type", "Secondary");

    axios
      .post("http://localhost:80/api/insertInsuranceInfoS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          message.success("Secondary insurance info submitted successfully");
          secondaryForm.resetFields();
          setSecondaryFileList([]);
          setShowSecondaryForm(false);
        } else {
          message.error(
            response.data.message || "Failed to submit secondary insurance info"
          );
        }
      })
      .catch(() => {
        message.error("Failed to submit secondary insurance info");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading)
    return (
      <Spin
        style={{ position: "fixed", top: "50%", bottom: "50%", left: "50%" }}
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
      <Title level={3} className="page-title">
        Primary Insurance Information
      </Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Insurance Card (Front and Back)"
          name="note_pdf"
          rules={[
            { required: true, message: "Please upload your insurance card!" },
          ]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            multiple={false}
            accept=".pdf"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Insured Relation"
          name="relation"
          rules={[
            { required: true, message: "Please select your insured relation!" },
          ]}
        >
          <Radio.Group
            onChange={(e) => setInsuranceType(e.target.value)}
            value={insuranceType}
          >
            <Radio value="S1">Self</Radio>
            <Radio value="S2">Spouse</Radio>
            <Radio value="C">Child</Radio>
            <Radio value="O">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Plan Name"
              name="planName"
              rules={[
                { required: true, message: "Please enter your plan name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Group/Policy Number"
              name="groupPolicy"
              rules={[
                {
                  required: true,
                  message: "Please enter your group/policy number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Member ID"
              name="memberId"
              rules={[
                { required: true, message: "Please enter your member ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Middle Name" name="middleName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please enter your date of birth!" },
              ]}
            >
              <Input type="date" width={"100%"} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Sex"
          name="sex"
          rules={[{ required: true, message: "Please select your sex!" }]}
        >
          <Select>
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
        <Form.Item label="Add Secondary Insurance">
          <Switch checked={showSecondaryForm} onChange={setShowSecondaryForm} />
        </Form.Item>
      </Form>
      {showSecondaryForm && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#e6f7ff",
            borderRadius: "8px",
          }}
        >
          <Title level={3} className="page-title">
            Secondary Insurance Information
          </Title>
          <Form
            form={secondaryForm}
            onFinish={onSecondaryFinish}
            layout="vertical"
          >
            <Form.Item
              label="Insurance Card (Front and Back)"
              name="secondaryInsuranceCard"
              rules={[
                {
                  required: true,
                  message: "Please upload your insurance card!",
                },
              ]}
            >
              <Upload
                fileList={secondaryFileList}
                beforeUpload={beforeUpload}
                onChange={handleSecondaryUploadChange}
                multiple={false}
                accept=".pdf"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Insured Relation" name="secondaryRelation">
              <Radio.Group
                onChange={(e) => setSecondaryInsuranceType(e.target.value)}
                value={secondaryInsuranceType}
              >
                <Radio value="S1">Self</Radio>
                <Radio value="S2">Spouse</Radio>
                <Radio value="C">Child</Radio>
                <Radio value="O">Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Plan Name"
                  name="secondaryPlanName"
                  rules={[
                    { required: true, message: "Please enter your plan name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Group/Policy Number"
                  name="secondaryGroupPolicy"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your group/policy number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Member ID"
                  name="secondaryMemberId"
                  rules={[
                    { required: true, message: "Please enter your member ID!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="First Name"
                  name="secondaryFirstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Last Name"
                  name="secondaryLastName"
                  rules={[
                    { required: true, message: "Please enter your last name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Middle Name" name="secondaryMiddleName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Date of Birth"
                  name="secondaryDob"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your date of birth!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Address"
                  name="secondaryAddress"
                  rules={[
                    { required: true, message: "Please enter your address!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Sex"
              name="secondarySex"
              rules={[{ required: true, message: "Please select your sex!" }]}
            >
              <Select>
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            </Form.Item>
            {showSecondaryForm && (
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;
