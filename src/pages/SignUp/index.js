import React, { useState } from "react";
import "./index_cadastro.css";

import { MdEmail, MdLock, MdOutlinePeopleAlt, MdOutlineRoofing } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [nomef, setNomef] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

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
          <MdOutlinePeopleAlt  />
          <input
            type="nome  "
            placeholder="Informe seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputEmail">
          <MdOutlineRoofing/>
          <input
            type="nomef"
            placeholder="Informe o nome da sua fazenda"
            value={nomef}
            onChange={(e) => setNomef(e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputEmail">
          <MdEmail />
          <input
            type="email"
            placeholder="Informe seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="SignUp-SignUpInputPassword">
          <MdLock />
          <input
            placeholder="Informe sua senha"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="SignUp-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button type="submit">Criar Conta</button>
      </div>
    </div>
  );
}
