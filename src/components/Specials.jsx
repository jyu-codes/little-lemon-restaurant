import "../css/Specials.css";
import SpecialCard from "./SpecialCard";
import greeksalad from "../assets/greek salad.jpg"
import bruschetta from "../assets/bruschetta.svg"
import lemondessert from "../assets/lemon dessert.jpg"

const Specials = () => {

    const specialsData = [
        {
            id: 1,
            title: "Greek Salad",
            price: "$12.99",
            description:
            "The famous Greek salad of crispy lettuce, peppers, olives and our Chicagp style feta cheese, garnished with crunchy garlic, and rosemary croutons.",
            image: greeksalad,
        },
        {
            id: 2,
            title: "Bruschetta",
            price: "$5.99",
            description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
            image: bruschetta,
        },
        {
            id: 3,
            title: "Lemon Dessert",
            price: "$5.00",
            description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
            image: lemondessert,
        },
    ];

    return (
    <section className="specials">
        <div className="specials-container">
            <div className="specials-header">
            <h2>This week's specials!</h2>
            <button type="button" aria-disabled="true" onClick={(e) => e.preventDefault()} title="Coming soon">Online Menu</button>
            </div>

            <div className="specials-cards">
            {specialsData.map((item) => (
                <SpecialCard
                key={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
                />
            ))}
            </div>
        </div>
    </section>
    )
}

export default Specials;