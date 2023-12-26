import { Container, Grid, List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

function Footer() {
  return (
    <Container fluid className="footer">
      <Grid stackable textAlign="center">
        <Grid.Row>
          <Grid.Column width={6} textAlign="center">
            <List link className="footer-list">
              <List.Item as={Link} to="/" className="item">
                Home
              </List.Item>
              <List.Item as={Link} to="/about" className="item">
                About
              </List.Item>
              <List.Item as={Link} to="/cart" className="item">
                Cart
              </List.Item>
              <List.Item as={Link} to="/contact" className="item">
                Contact Us
              </List.Item>
              {Auth.loggedIn() ? (
                <List.Item as={Link} to="/login" className="item">
                  Login
                </List.Item>
              ) : (
                <List.Item onClick={Auth.logout} className="item">
                  Login
                </List.Item>
              )}
            </List>
          </Grid.Column>
          <Grid.Column width={6} textAlign="center">
            <p>Stay connected with us on social media!</p>
            <Icon name="facebook" size="big" link />
            <Icon name="twitter" size="big" link />
            <Icon name="instagram" size="big" link />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Footer;
