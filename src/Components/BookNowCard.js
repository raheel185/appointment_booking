import React, { useState, useRef, useEffect } from "react";
import '../Styles/BookCard.css';
import pic from '../assets/doctor.png';
import { useNavigate } from "react-router-dom";

const BookNowCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const nav=useNavigate();
    const scheduleRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            scheduleRef.current.style.maxHeight = scheduleRef.current.scrollHeight + "px";
        } else {
            scheduleRef.current.style.maxHeight = "0px";
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="cardB">
            <div className="card-header">
                <img src={pic} alt="LI Acupuncture and Herbs" className="logo" />
                <h2 style={{ color: 'black' }}>Book your appointment</h2>
            </div>
            <div className="card-content">
                <div className="status" onClick={toggleExpand}>
                    <span className="status-icon">🕒</span>
                    <span className="status-text">Closed now</span>
                    <span className="status-time">9 AM – 3:30 PM</span>
                </div>
                <div ref={scheduleRef} className="schedule">
                    <div className="schedule-item"><span>Monday</span><span>9 AM – 3:30 PM</span></div>
                    <div className="schedule-item"><span>Tuesday</span><span>11:45 AM – 6:15 PM</span></div>
                    <div className="schedule-item"><span>Wednesday</span><span>Closed</span></div>
                    <div className="schedule-item"><span>Thursday</span><span>9 AM – 3:30 PM</span></div>
                    <div className="schedule-item"><span>Friday</span><span>9 AM – 3:30 PM</span></div>
                    <div className="schedule-item"><span>Saturday</span><span>9 AM – 3:30 PM</span></div>
                    <div className="schedule-item"><span>Sunday</span><span>Closed</span></div>
                    <div className="time-zone">Time zone (Eastern Daylight Time)</div>
                </div>
            </div>
            <div className="card-footer">
                <button className="book-button" onClick={()=>{nav('/Appointment')}}>Book</button>
            </div>
        </div>
    );
};

export default BookNowCard;
