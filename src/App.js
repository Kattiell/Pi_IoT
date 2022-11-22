import "./App.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="container2">
      <div className="absoluta">
        <div className="text">
          <h1>AGROTECH</h1>
          <h2>
            Soluções agrárias, <br></br>
            sempre ao lado de <br></br>
            quem produz
          </h2>
        </div>

        <div className="header-buttons">
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate("/cadastre-se");
            }}
          >
            Cadastre-se
          </button>
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
}
