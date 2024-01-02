import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Input, Button, Message, Container } from "semantic-ui-react";
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
    <Container text>
      <div>
        <h2>Login</h2>
        {error && (
          <Message negative>
            <Message.Header>
              Please enter the correct credentials
            </Message.Header>
          </Message>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <label>Email address:</label>
            <Input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
          {/* <GoogleLoginButton /> */}
        </Form>
        <h3>Need to create an account?</h3>
        <Link to="/signup"> Sign Up</Link>
      </div>
    </Container>
  );
}

export default Login;
