import React from "react";
import "../Styles/Card.css";

const Card = ({ image, title, description, onClick }) => {
  return (
    <button className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </button>
  );
};

export default Card;
