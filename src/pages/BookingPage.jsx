import Bookings from "../components/Bookings";
import "../css/BookingPage.css";

const BookingPage = ({ availableTimes, dispatch, submitForm }) => {
     return (
        <div className="booking-page">
            <Bookings
                availableTimes={availableTimes}
                dispatch={dispatch}
                submitForm={submitForm}
            />
        </div>
    );
}

export default BookingPage;