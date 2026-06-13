import heroImage from "../assets/restaurantfood.jpg"
import "../css/Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-container">
                <article>
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>

                <p>
                    We are a family owned Mediterranean restaurant
                    focused on traditional recipes served with a
                    modern twist.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/reservations")}
                >
                    Reserve a Table
                </button>
                </article>

                <img src={heroImage} alt="Restaurant food" />
            </div>
        </section>
    )
}

export default Hero;