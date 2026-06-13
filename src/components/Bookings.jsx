import { useBooking } from "../context/BookingContext";
import BookingForm from "./BookingForm";
import { FaTrashAlt } from "react-icons/fa";

const Bookings = () => {
  const { bookings, resetBookings } = useBooking();

  return (
    <div className="bookings-container">
      <BookingForm />

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
              onClick={resetBookings}
            />
          )}
        </div>

        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Occasion</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.occasion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;