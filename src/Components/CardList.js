import React from "react";
import Card from "./Card";
import "../Styles/CardList.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CardList = () => {
  const user = useSelector((state) => state.auth.user);
  const loginState = user ? true : false;
  const navigation = useNavigate();
  const handleClick = (title, providerName) => {
    navigation(
      loginState ? "/Appointment" : "/Login",
      loginState && { state: { title, providerName } }
    );
  };
  const cards = [
    {
      image: "https://via.placeholder.com/200x150?text=Consult+Online+Now",
      title: "Consult Online Now",
      providerName: "Dr. John Doe",
      description: "Instantly connect with Specialists through Video call.",
    },
    {
      image: "https://via.placeholder.com/200x150?text=In-Clinic+Appointments",
      title: "In-Clinic Appointments",
      providerName: "Dr. John Doe",
      description: "Book an In-Person visit to doctor's clinic.",
    },
    {
      image: "https://via.placeholder.com/200x150?text=Laboratory+Tests",
      title: "Laboratory Tests",
      providerName: "Dr. John Doe",
      description: "Avail Exclusive discounts on lab tests.",
    },
    {
      image:
        "https://via.placeholder.com/200x150?text=Procedures+%26+Surgeries",
      title: "Procedures & Surgeries",
      providerName: "Dr. John Doe",
      description: "Plan your surgeries at discounted rates.",
    },
    {
      image: "https://via.placeholder.com/200x150?text=BOLO+Health",
      title: "BOLO Health",
      providerName: "Dr. John Doe",
      description:
        "Family planning and reproductive health services for youth.",
    },
  ];

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          onClick={() => handleClick(card.title, card.providerName)}
        />
      ))}
    </div>
  );
};

export default CardList;
