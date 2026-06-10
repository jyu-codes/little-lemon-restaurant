import Bookings from "../components/Bookings";
import "../css/BookingPage.css";

const BookingPage = ({ availableTimes, dispatch }) => {
     return (
        <div className="booking-page">
            <Bookings
                availableTimes={availableTimes}
                dispatch={dispatch}
            />
        </div>
    );
}

export default BookingPage;