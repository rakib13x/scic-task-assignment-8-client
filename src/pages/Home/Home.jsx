import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import Review from "../Review/Review";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Tasker | Home</title>
      </Helmet>
      <Hero />
      <Review />
    </div>
  );
};

export default Home;
