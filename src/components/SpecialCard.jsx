import { FaMotorcycle } from "react-icons/fa";

const SpecialCard = ({ title, price, description, image, alt }) => {
  return (
    <article className="card">
      
      <img src={image} alt={alt} />

      <div className="card-content">
        
        <div className="card-header">
          <h3>{title}</h3>
          <p className="price">{price}</p>
        </div>

        <p className="card-description">
          {description}
        </p>

        <div className="card-footer">
          <button className="delivery-btn">
            <span>Order a delivery</span>
            <FaMotorcycle className="deliver-icon" aria-hidden="true" />
        </button>
        </div>

      </div>

    </article>
  );
};

export default SpecialCard;