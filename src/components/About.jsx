import "../css/About.css";
import image1 from "../assets/Mario and Adrian A.jpg";
import image2 from "../assets/Mario and Adrian b.jpg";

const About = () => {
    return (
        <section className="about">
        <div className="about-container">
          <article>
            <h2>Little Lemon</h2>
            <h3>Chicago</h3>

            <p>
              Our Story Founded in Chicago by brothers Mario and Adrian, Little Lemon began as a shared dream to bring coastal Mediterranean
              hospitality to the Midwest. Mario draws from his extensive background cooking in Italy, utilizing ancestral family recipes to 
              anchor our signature kitchen profile.
            </p>
            <p>
              Meanwhile, Adrian leads our creative vision, expanding our initial Italian base to incorporate 
              rich, diverse flavors from Greek and Turkish traditions.
            </p>
          </article>

          <figure className="about-images">
            <img src={image1} alt="Mario and Adrian A" loading="lazy" />
            <img src={image2} alt="Mario and Adrian B" loading="lazy" />
            <figcaption>Mario and Adrian, founders of Little Lemon</figcaption>
          </figure>
      </div>
      </section>
    )
}

export default About;