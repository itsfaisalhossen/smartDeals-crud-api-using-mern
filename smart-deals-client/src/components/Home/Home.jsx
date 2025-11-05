import Container from "../Container";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:5000/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Container>
        <h4>This is Home</h4>
        <LatestProducts latestProductsPromise={latestProductsPromise} />
      </Container>
    </div>
  );
};
export default Home;
