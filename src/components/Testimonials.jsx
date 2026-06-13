import "../css/Testimonials.css";
import TestimonialsCard from "./TestimonialsCard";

const Testimonials = () => {

    const testimonialsData = [
        {
            id: 1,
            name: "Marcus Vance",
            rating: 5,
            comment: "The steak was cooked to absolute perfection, and the truffle fries are a must-try! Exceptional service."
        },
        {
            id: 2,
            name: "Elena Rostova",
            rating: 4,
            comment: "Amazing flavors and beautiful presentation. It was a bit noisy for date night, but the pasta made up for it."
        },
        {
            id: 3,
            name: "David Choo",
            rating: 2,
            comment: "Best Turkish Mac n' Cheese in town! A must-try indeed."
        },
        {
            id: 4,
            name: "Aaliyah Jordan",
            rating: 5,
            comment: "Hands down the best dining experience I've had this year! The cocktail menu is incredibly creative."
        }
    ];

    return (
        <section className="testimonials">
            <div className="testimonials-container">
                <h2>Testimonials</h2>

                <div className="testimonial-cards">
                {testimonialsData.map((item) => (
                    <TestimonialsCard
                    key={item.id}
                    name={item.name}
                    rating={item.rating}
                    comment={item.comment}
                    />
                ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;