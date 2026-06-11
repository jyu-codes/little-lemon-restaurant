import "../css/ConfirmedBooking.css";
import { useLocation, Navigate } from "react-router-dom";

const ConfirmedBooking = () => {
  const { state } = useLocation();

  // block invalid access BEFORE render
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { date, time, guests, occasion } = state;

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmed 🎉</h1>

      <p>Your reservation has been successfully submitted.</p>

      <div className="reservation-details">
        <h2>Reservation Details</h2>

        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Occasion:</strong> {occasion}</p>
      </div>
    </div>
  );
};

export default ConfirmedBooking;