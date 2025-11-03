import { Link, NavLink } from "react-router";
import Container from "../Container";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, signOutFunc } = useContext(AuthContext);
  return (
    <div
      className="py-6 bg-white shadow-md border-b border-gray-50
    "
    >
      <Container>
        <div className="flex justify-between gap-4 items-center">
          <div>
            <Link className="font-bold text-xl md:text-2xl" to={"/"}>
              Smart <span className="text-blue-700">Deals</span>
            </Link>
          </div>
          <ul className="hidden md:flex items-center gap-5 lg:gap-8">
            <NavLink
              className={
                "hover:text-blue-700 duration-300 font-medium text-[15px]"
              }
              to={"/"}
            >
              {" "}
              Home
            </NavLink>
            <NavLink
              className={
                "hover:text-blue-700 duration-300 font-medium text-[15px]"
              }
              to={"/all-products"}
            >
              All Products
            </NavLink>
            {user && (
              <>
                <NavLink
                  className={
                    "hover:text-blue-700 duration-300 font-medium text-[15px]"
                  }
                  to={"/my-products"}
                >
                  My Products
                </NavLink>
                <NavLink
                  className={
                    "hover:text-blue-700 duration-300 font-medium text-[15px]"
                  }
                  to={"/my-bids"}
                >
                  My Bids
                </NavLink>
              </>
            )}
            <NavLink
              className={
                "hover:text-blue-700 duration-300 font-medium text-[15px]"
              }
              to={"/create-product"}
            >
              {" "}
              Create Product
            </NavLink>
          </ul>
          <div className="flex items-center gap-3 font-medium">
            {user ? (
              <div className="flex items-center gap-3 ">
                <div className="rounded-full bg-red-400 p-1">
                  <img
                    referrerPolicy="no-referrer"
                    title={user?.displayName}
                    height={32}
                    width={32}
                    className="rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <button onClick={signOutFunc} className="btn">
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  className="border rounded-md px-4 py-2  text-blue-700"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="rounded-md text-white px-4 py-2 bg-[linear-gradient(125.07deg,rgba(99,46,227,1),rgba(159,98,242,1)_100%)]"
                  to={"/register"}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
