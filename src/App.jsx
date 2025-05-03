import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar";
import "./App.css";

function AppContent() {
  const routing = useRoutes(routes);
  return (
    <>
      <Navbar />
      <div className="container">{routing}</div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
