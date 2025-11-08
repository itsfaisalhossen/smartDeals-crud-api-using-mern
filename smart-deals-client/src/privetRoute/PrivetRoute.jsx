import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../providers/AuthProvider/AuthContext";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // const Navigate = useNavigate();

  if (loading) {
    return <>Loading.....</>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/login"} />;
};
export default PrivetRoute;
