import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_UP } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Input, Button, Message, Container } from "semantic-ui-react";
// import GoogleLoginButton from "../components/GoogleLoginButton";

function SignUp() {
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
    <Container text>
      <div>
        <h2>Sign Up</h2>
        {error && (
          <Message negative>
            <Message.Header>Error signing up!</Message.Header>
          </Message>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Form.Field>
            <label>First Name:</label>
            <Input
              type="text"
              name="firstName"
              placeholder="John"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name:</label>
            <Input
              type="text"
              name="lastName"
              placeholder="Smith"
              onChange={handleChange}
            />
          </Form.Field>
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
        <h3>Already have an account?</h3>
        <Link to="/login">Log In</Link>
      </div>
    </Container>
  );
}

export default SignUp;
