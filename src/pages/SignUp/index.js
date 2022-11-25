import React, { useRef, useState } from "react";
import "./index_cadastro.css";
import styles from "./styles.module.css";
import {
  MdEmail,
  MdLock,
  MdOutlinePeopleAlt,
  MdOutlineRoofing,
} from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ChangeInputValue from "../../services/Inputs/ChangeInputValue";
import { ToastError, ToastInfo, ToastSucess } from "../../services/Toast";
import { CadastrarUsuario } from "../../services/Api/Users";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const nomeInput = useRef('');
  const nomeFazendaInput = useRef('');
  const emailInput = useRef('');
  const passwordInput = useRef('');

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="SignUp">
      <div className="SignUp-right">
        <h1>Cadastre-se</h1>

        {/* <img src="https://media.istockphoto.com/vectors/green-agro-icon-vector-id1167533705?k=20&m=1167533705&s=170667a&w=0&h=lxnygeEpIA8yQl0SCAtNF7uf8eBU4vKdg0VGMp3rR54="></img> */}

        <div className="SignUp-SignUpInputEmail">
          <MdOutlinePeopleAlt />
          <input
            type="text"
            placeholder="Informe seu nome completo"
            value={nomeInput.current.value}
            ref={nomeInput}
            onChange={(e) => ChangeInputValue(nomeInput, e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputEmail">
          <MdOutlineRoofing />
          <input
            type="nomef"
            placeholder="Informe o nome da sua fazenda"
            value={nomeFazendaInput.current.value}
            ref={nomeFazendaInput}
            onChange={(e) => ChangeInputValue(nomeFazendaInput, e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputEmail">
          <MdEmail />
          <input
            type="email"
            placeholder="Informe seu e-mail"
            value={emailInput.current.value}
            ref={emailInput}
            onChange={(e) => ChangeInputValue(emailInput, e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputPassword">
          <MdLock />
          <input
            placeholder="Informe sua senha"
            type={show ? "text" : "password"}
            value={passwordInput.current.value}
            ref={passwordInput}
            onChange={(e) => ChangeInputValue(passwordInput, e.target.value)}
          />
          <div className="SignUp-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button
          type="submit"
          onClick={() => {
            CadastrarUsuario(nomeInput.current.value, emailInput.current.value, passwordInput.current.value, nomeFazendaInput.current.value, navigate("/login"));
          }}
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
}
