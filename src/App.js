import { Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-buttons">
          <button>Cadastre-se</button>
            
          <button onClick={Login}>
            <Link to="/Login">Login</Link>
            </button>
            
        </div>
      </header>
    </div>
  );
}
