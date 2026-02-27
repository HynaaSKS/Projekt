import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Domů</Link> |{" "}
      <Link to="/calculator">Kalkulačka</Link>
    </nav>
  );
}

export default Navbar;