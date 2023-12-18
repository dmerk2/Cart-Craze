import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

function Header() {
  return (
    <header className="ui secondary pointing menu">
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
      </nav>
    </header>
  );
}

export default Header;
