import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/users" className="nav-link">Users</Link>
      {/* <Link to="/events" className="nav-link">Events</Link> */}
      {/* <Link to="/topics" className="nav-link">Topics</Link> */}
    </nav>
  );
}
