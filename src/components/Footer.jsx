import footer_logo from "../assets/logo_footer.png";
import "../css/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer>
      <div className="footer-logo-container">
        <img src={footer_logo} alt="Little Lemon Logo" className="footer-logo" />

        <section>
          <h3>Navigation</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
          </ul>
        </section>

        <section>
          <h3>Contact</h3>
          <p>Address</p>
          <p>Phone Number</p>
          <p>Email</p>
        </section>

        <section>
          <h3>Social Media Links</h3>

          <ul>
            <li><a href="/">Facebook</a></li>
            <li><a href="/">Instagram</a></li>
            <li><a href="/">X</a></li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;