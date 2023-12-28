import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_UP } from "../utils/mutations";
import Auth from "../utils/auth";
// import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signup, { error }] = useMutation(SIGN_UP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const signupMutation = await signup({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = signupMutation.data.addUser.token;
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
      <h2>Sign Up</h2>
      {error ? (
        <div>
          <p>Error signing up!</p>
        </div>
      ) : null}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="John"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Smith"
            onChange={handleChange}
          />
        </div>
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
      <h3>Already have an account?</h3>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default Login;
