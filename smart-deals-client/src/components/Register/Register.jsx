import { Link, Navigate, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthContext";

const Register = () => {
  const {
    createUserFunc,
    user,
    setUser,
    updateProfileFunc,
    setLoading,
    signInWithGoogleFunc,
  } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogleFunc()
      .then((result) => {
        setLoading(false);
        console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        // fetch usert he database
        fetch(`http://localhost:5000/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after use save", data);
          });
        alert("Login Successfull");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);

    const regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,}$/;

    if (!regEx.test(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    createUserFunc(email, password)
      .then((res) => {
        const user = res?.user;
        alert("Account Created Successfully");
        console.log(user);
        setLoading(false);
        updateProfileFunc(name, photo)
          .then(() => {
            setUser({ ...user, name, photo });
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setUser(user);
            setLoading(false);
          });
        setUser(res.user);
        setLoading(false);
        e.target.reset();
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div
          className="hero-content flex-col   
        "
        >
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-center">Register now</h1>
            <div className="flex items-center gap-2">
              <p className="py-3">Already have an account?</p>
              <Link to={"/login"} className="text-blue-700">
                Login Now
              </Link>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body p-10">
              <fieldset className="fieldse">
                <form onSubmit={handleLogin}>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input mb-4"
                    placeholder="Name"
                    required
                  />
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
                  <label className="label  mt-4">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    className="input"
                    placeholder="Photo_URL"
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
export default Register;
