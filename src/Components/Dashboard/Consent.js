import React, { useState, useEffect } from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { FaFilePdf } from "react-icons/fa6";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import pdf from "../../assets/consent.pdf";
import { useSelector } from "react-redux";
const { Dragger } = Upload;
const { Title } = Typography;

const Consent = () => {
  const [fileList, setFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const patientId = user.id;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [uploadInfo, setUploadInfo] = useState({
    name: "",
    uploadedBy: "",
    uploadDate: "",
  });

  useEffect(() => {
    const fetchConsentForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/getConsentForm?patient_id=${patientId}`,
          { responseType: "blob" }
        );
        if (response.data.type === "application/pdf") {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setFileList([
            {
              uid: "-1",
              name: "consentForm.pdf",
              status: "done",
              url: url,
            },
          ]);
          setUploadInfo({
            name: "consentForm.pdf",
            uploadedBy: "user",
            uploadDate: new Date()
              .toISOString()
              .split("T")[0]
              .replace(/-/g, ""),
          });
        } else {
          setFileList([]);
          setUploadInfo({
            name: "",
            uploadedBy: "",
            uploadDate: "",
          });
          setPdfUrl("");
        }
      } catch (error) {
        console.error("Failed to fetch consent form:", error);
        setFileList([]);
        setUploadInfo({
          name: "",
          uploadedBy: "",
          uploadDate: "",
        });
        setPdfUrl("");
      }
    };
    fetchConsentForm();
  }, [patientId]);

  const handleUpload = async ({ file, onSuccess }) => {
    try {
      const formData = new FormData();
      formData.append("consentForm", file);
      formData.append("patient_id", patientId);

      const response = await axios.post(
        "http://localhost:80/api/insertConsentForm",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        const url = URL.createObjectURL(file);
        setFileList([
          {
            uid: "-1",
            name: file.name,
            status: "done",
            url: url,
          },
        ]);
        setUploadInfo({
          name: file.name,
          uploadedBy: "user",
          uploadDate: new Date().toISOString().split("T")[0].replace(/-/g, ""),
        });
        setPdfUrl(url);
        message.success("Upload successful!");
      } else {
        message.error(response.data.message);
      }

      onSuccess("ok");
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:80/api/deleteConsentForm`,
        {
          params: { patient_id: patientId },
        }
      );

      if (response.data.status === "success") {
        setFileList([]);
        setUploadInfo({
          name: "",
          uploadedBy: "",
          uploadDate: "",
        });
        setPdfUrl("");
        message.success("File deleted successfully!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Delete failed.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ marginBottom: "20px" }} className="page-title">
        Clinic Consent Form
      </Title>

      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          padding: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onDoubleClick={() => window.open(pdf)}
      >
        <FaFilePdf
          color="red"
          style={{ width: "30px", height: "auto", marginRight: "10px" }}
        />
        <div>
          <div>
            <Typography style={{ fontWeight: "bold" }}>
              {uploadInfo.name}
            </Typography>
          </div>
          <div>Uploaded By: {uploadInfo.uploadedBy}</div>
          <div>Upload Date: {uploadInfo.uploadDate}</div>
        </div>
        {!isMobile && (
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => window.open(pdf)}
            style={{ marginLeft: "auto" }}
          >
            View
          </Button>
        )}
      </div>
      <Dragger
        customRequest={handleUpload}
        fileList={fileList}
        onRemove={handleDelete}
        accept=".pdf"
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single PDF file upload.</p>
      </Dragger>
      {fileList.length > 0 && (
        <Button
          type="danger"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          style={{ marginTop: "10px" }}
        >
          Delete Upload
        </Button>
      )}
    </div>
  );
};

export default Consent;
