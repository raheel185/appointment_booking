import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Tabs, Table, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../../Styles/Appointments.css";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const user = useSelector((state) => state.auth.user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getAppointment/",
          {
            params: { user_id: user.id },
          }
        );
        setAppointments(response.data.appointments || []);
        setLoading(false);
        console.log(response.data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchAppointments();
    }
  }, [user]);

  useEffect(() => {
    const categorizeAppointments = () => {
      const now = new Date();
      const upcoming = [];
      const past = [];
      if (appointments.length === 0) return;
      appointments.forEach((appointment) => {
        const appointmentDateTime = new Date(
          `${appointment.appointment_date}T${appointment.appointment_time}`
        );
        if (appointmentDateTime > now) {
          upcoming.push(appointment);
        } else {
          past.push(appointment);
        }
      });

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
    };

    categorizeAppointments();
  }, [appointments]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/deleteAppointment/`,
        {
          data: { user_id: user.id, id: id },
        }
      );
      console.log(id);
      console.log(response.data);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
      setPastAppointments(
        pastAppointments.filter((appointment) => appointment.id !== id)
      );
      setUpcomingAppointments(
        upcomingAppointments.filter((appointment) => appointment.id !== id)
      );
      alert("Appointment deleted successfully");
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const columns = [
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Date",
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Time",
      dataIndex: "appointment_time",
      key: "appointment_time",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Type",
      dataIndex: "appointment_type",
      key: "appointment_type",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Notes",
      dataIndex: "appointment_notes",
      key: "appointment_notes",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Patient Type",
      dataIndex: "patient_type",
      key: "patient_type",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  if (loading)
    return (
      <Spin
        style={{ position: "fixed", top: "50%", bottom: "50%", left: "50%" }}
        spinning
        size="large"
      />
    );

  return (
    <div className="appointments-container">
      <Title level={2} className="page-title">
        Your Appointments
      </Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Upcoming" key="upcoming">
          {upcomingAppointments.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <Title level={4} className="no-appointments">
                No upcoming appointments
              </Title>
              <Button
                type="default"
                href="/"
                style={{ borderRadius: "40px", padding: "23px", width: "100%" }}
              >
                Book Appointment
              </Button>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={upcomingAppointments}
              rowKey="id"
              pagination={false}
              scroll={{ x: 1200 }}
            />
          )}
        </TabPane>
        <TabPane tab="Past" key="past">
          {pastAppointments.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <Title level={4} className="no-appointments">
                No Past appointments
              </Title>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={pastAppointments}
              rowKey="id"
              pagination={false}
              scroll={{ x: 1200 }} // Adjust based on content width
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Appointments;
