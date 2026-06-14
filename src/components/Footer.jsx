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
          <p>
            123 Citrus Avenue<br />
            Chicago, IL 60601<br />
            USA
          </p>
          <p>+1 (312) 555-0147</p>
          <p>hello@littlelemon.com</p>
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
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;