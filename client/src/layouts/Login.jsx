import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

  };
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
          />
        </div>
        <GoogleLoginButton />
      </form>
      <h3>Need to create an account?</h3>
      <Link to="/signup"> Sign Up</Link>
    </div>
  );
}

export default Login;
