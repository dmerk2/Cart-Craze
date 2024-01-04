import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

function Header() {
  const handleCheckout = () => {
    // Add logic for handling checkout, e.g., redirect to a checkout page
    console.log("Checkout clicked!");
  };

  return (
    <header className="ui secondary pointing menu header">
      <Link to="/" className="item">
        Home
      </Link>
      <nav className="right menu">
        <Link to="/about" className="item">
          About
        </Link>

        <Link to="/contact" className="item">
          Contact
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Dropdown item text="Cart">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/cart">
                  View Cart
                </Dropdown.Item>
                <Dropdown.Item onClick={handleCheckout}>Checkout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link onClick={() => Auth.logout()} className="item">
              Log Out
            </Link>
          </>
        ) : (
          <Link to="/login" className="item">
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
