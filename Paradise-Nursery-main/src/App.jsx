import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Paradise Nursery</h1>

        <p>
          Welcome to Paradise Nursery — your one-stop shop for beautiful indoor,
          medicinal, and aromatic plants.
        </p>

        <Link to="/products">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
