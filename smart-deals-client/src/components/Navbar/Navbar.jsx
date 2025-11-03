import { Link, NavLink } from "react-router";
import Container from "../Container";

const Navbar = () => {
  return (
    <div className="py-10 bg-white shadow-md border-b border-gray-50">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <h3>SmartDeals</h3>
          </div>
          <ul className="flex items-center gap-5">
            <NavLink to={"/"}> Home</NavLink>
            <NavLink to={"/all-products"}> All Products</NavLink>
            <NavLink to={"/my-product"}> My Products</NavLink>
            <NavLink to={"/my-bids"}> My Bids</NavLink>
            <NavLink to={"/create-product"}> Create Product</NavLink>
          </ul>
          <div className="flex items-center gap-3">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
