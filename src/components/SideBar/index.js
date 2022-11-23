import styles from "./styles.module.css";
import { ImHome } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SideBar({ backgroundColor, colorIcons }) {

  const navigate = useNavigate();

  return (
    <div id={styles["container"]} style={{ backgroundColor: backgroundColor }}>

      <ImHome
        style={{ cursor: "pointer" }}
        color={colorIcons}
        size={35}
        onClick={() => { navigate('/home') }}
      ></ImHome>

      <FaHistory
        style={{ cursor: "pointer" }}
        color={colorIcons}
        size={35}
        onClick={() => { navigate('/historico') }}
      ></FaHistory>

      <MdSupportAgent
        style={{ cursor: "pointer" }}
        color={colorIcons}
        size={40}
        onClick={() => {}}
      ></MdSupportAgent>

      <BiLogOut
        style={{ cursor: "pointer" }}
        color={colorIcons}
        size={40}
        onClick={() => {
          navigate('/login');
          document.cookie = "AgroTechAuthorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }}
      ></BiLogOut>
    </div>
  );
}
