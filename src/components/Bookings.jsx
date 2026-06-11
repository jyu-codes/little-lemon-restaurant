import BookingForm from "./BookingForm";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Bookings = ({ availableTimes, dispatch, submitForm }) => {
   const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleSubmit = (formData) => {
    setBookings((prev) => [...prev, formData]);
    submitForm(formData);
  };

  const handleReset = () => {
    setBookings([]);
    localStorage.removeItem("bookings");
  };

  return (
    <div className="bookings-container">
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={handleSubmit}
        bookings={bookings}
      />

      <div className="booking-table-wrapper">
        <div className="booking-table-header">
          <h2 className="booking-title">Booking Data</h2>
          {bookings.length > 0 && (
            <FaTrashAlt
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "var(--secondary-orange)",
                marginTop: "-1rem",
              }}
              title="Reset Bookings"
              onClick={handleReset}
            />
          )}
        </div>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Occasion</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.guests}</td>
                <td>{item.occasion}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Bookings;