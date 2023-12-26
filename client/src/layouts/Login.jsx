import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
// import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginMutation = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = loginMutation.data.login.token;
      Auth.login(token);
    } catch (error) {
      console.error(error);
    }
  };

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
      {error ? (
        <div>
          <p>Please enter the correct credentials</p>
        </div>
      ) : null}
      <form onSubmit={handleFormSubmit}>
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
        <div>
          <button type="submit">Submit</button>
          {/* <GoogleLoginButton /> */}
        </div>
      </form>
      <h3>Need to create an account?</h3>
      <Link to="/signup"> Sign Up</Link>
    </div>
  );
}

export default Login;
