import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";
import { useContext } from "react";

const Login = () => {
  const { signInUserFunc, setLoading, signInWithGoogleFunc } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogleFunc()
      .then((result) => {
        console.log(result.user);
        setLoading(false);
        alert("Login Successfull");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUserFunc(email, password)
      .then((res) => {
        console.log(res.user);
        navigate("/");
        setLoading(false);
        alert("Login Successfully");
        e.target.reset();
      })
      .catch((err) => {
        alert("Password is Worng");
        console.log(err.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col  ">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center">Login now</h1>
            <div className="flex items-center gap-2">
              <p className="py-3">Don't have an account?</p>
              <Link to={"/register"} className="text-blue-700">
                Register Now
              </Link>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body p-10">
              <fieldset className="fieldse">
                <form onSubmit={handleLogin}>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                  />
                  <label className="label  mt-4">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <input
                    className="btn btn-neutral mt-4 w-full"
                    type="submit"
                    value="Sign In"
                  />
                  <hr className="my-5" />
                </form>
              </fieldset>
              <button onClick={handleGoogleLogin} className="btn">
                {" "}
                <FcGoogle size={22} />
                Sign in with google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
