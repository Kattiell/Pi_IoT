import React, { useState } from "react";
import "./index.css";

import { MdEmail, MdLock } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img
          src="https://st4.depositphotos.com/8186828/23886/v/450/depositphotos_238865988-stock-illustration-farm-vector-logo-agro-emblem.jpg"
          alt="MdLockLogin App"
        />
      </div>
      <div className="login-right">
        <h1>Efetuar Login</h1>
        
          <img src="https://media.istockphoto.com/vectors/green-agro-icon-vector-id1167533705?k=20&m=1167533705&s=170667a&w=0&h=lxnygeEpIA8yQl0SCAtNF7uf8eBU4vKdg0VGMp3rR54="></img>

        <div className="login-loginInputEmail">
          <MdEmail />
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-loginInputPassword">
          <MdLock />
          <input
            placeholder="Digite sua senha"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button type="submit">Entrar</button>

        <h4>Não possui uma conta?</h4>

        <button type="submit">Cadastre-se</button>

        <h4>Esqueceu senha.</h4>
      </div>
    </div>
  );
}