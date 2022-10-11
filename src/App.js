import { Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SingUp from "./pages/SignUp";

export default function App() {
  return (
    <div className="container2">
      <div className="absoluta">
        <div className="text">
          <h1>AGROTECH</h1>
          <h2>Soluções agrárias,</h2>
          <h2>sempre ao lado de </h2>
          <h2>quem produz</h2>
        </div>

        <div className="header-buttons">
        <button onClick={Login}>
            <Link className="link" to="/Login">Login</Link>
          </button>

          <button onClick={SingUp}>
            <Link className="link" to="/cadastre-se">Cadastre-se</Link>
          </button>  
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
}
