// import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

function Header() {
  return (
    <header className="ui secondary pointing menu header">
      <Link to="/" className="item">
        Home
      </Link>
      <nav className="right menu">
        <Link to="/about" className="item">
          About
        </Link>
        <Link to="/cart" className="item">
          Cart
        </Link>
        <Link to="/contact" className="item">
          Contact
        </Link>
        <Link to="/login" className="item">
          Log In
        </Link>
        {/* {Auth.loggedIn() ? (
          <Link onClick={Auth.logout}>Log Out</Link>
        ) : (
          <Link to="/login">Log In</Link>
        )} */}
      </nav>
    </header>
  );
}

export default Header;
