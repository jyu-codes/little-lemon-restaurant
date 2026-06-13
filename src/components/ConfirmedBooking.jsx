import "../css/ConfirmedBooking.css";
import { useBooking } from "../context/BookingContext";
import { Navigate } from "react-router-dom";

const ConfirmedBooking = () => {
  const { lastBooking } = useBooking();

  return (
  <div className="confirmation-page">
    <h1>
      {lastBooking
        ? "Booking Confirmed 🎉"
        : "No Booking Found"}
    </h1>

    {lastBooking ? (
      <>
        <p>Your reservation has been successfully submitted.</p>

        <div className="reservation-details">
          <h2>Reservation Details</h2>

          <p>
            <strong>Name:</strong> {lastBooking.name}
          </p>
          <p>
            <strong>Date:</strong> {lastBooking.date}
          </p>
          <p>
            <strong>Time:</strong> {lastBooking.time}
          </p>
          <p>
            <strong>Guests:</strong> {lastBooking.guests}
          </p>
          <p>
            <strong>Occasion:</strong> {lastBooking.occasion}
          </p>
        </div>
      </>
    ) : (
      <p>No booking data available.</p>
    )}
  </div>
  );
};

export default ConfirmedBooking;