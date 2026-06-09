const TestimonialsCard = ({ name, image, rating, comment }) => {

    const renderStars = (num) => "★".repeat(num);

    return (
        <article className="card">
        <h3 className="card-rating">{renderStars(rating)}</h3>
        
        <div className="card-header">
            {image && <img src={image} alt={`${name}'s avatar`} className="card-image" />}
            <p className="card-name">{name}</p>
        </div>

        <p className="card-comment">{comment}</p>
        </article>
    );
};

export default TestimonialsCard;