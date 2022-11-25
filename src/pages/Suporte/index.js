import React from "react";
import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { HiPhone, HiChatAlt2, HiUser, HiFolder } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import { AiTwotoneBank } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import SideBar from "../../components/SideBar";
import { useState } from "react";
import emailJs from "@emailjs/browser";
import { ToastError, ToastInfo, ToastSucess } from "../../services/Toast/index"

export default function Suporte() {
  const [nome, setNome] = useState("");
  const [nomeFazenda, setNomeFazenda] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [duvida, setDuvida] = useState("");

  function sendEmail(e) {
    e.preventDefault();

    if (nome === "" || nomeFazenda === "" || email === "" || telefone === "" || assunto === "" || duvida === '') {
      alert("Preencha Todos os Campos");
      return;
    }

    const templateParams = {
      from_nome: nome,
      from_nomeFazenda: nomeFazenda,
      from_email: email,
      from_telefone: telefone,
      from_assunto: assunto,
      from_duvida: duvida,
    };

    emailJs.send( "service_zsqjgj6", "template_e0888ph", templateParams, "fVyxLzjrQvksMcReC")
      .then((response) => 
      {
        console.log("Mensagem Enviada", response.status, response.text)
        ToastSucess("Mensagem Enviada");
        setNome("");
        setNomeFazenda("");
        setEmail("");
        setTelefone("");
        setAssunto("");
        setDuvida("");
      }, (err) =>{
          console.log("ERRO:", err)
      })
  }

  return (
    <div className={styles["container"]}>
      <SideBar colorIcons={"#FFFFFF"} backgroundColor={"#1D4D16"} />
      
        <div className={styles["suporte"]}>
        <form className="form" onSubmit={sendEmail}>
          <div className={styles["login-right"]}>
            <h1>Contate-nos</h1>
            <p>Para dúvidas, preencha o formulário abaixo.</p>
            <div className={styles["login-loginInputEmail"]}>
              <HiUser />
              <input
                type="nome"
                placeholder="Digite seu nome"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
            </div>
            <div className={styles["login-loginInputEmail"]}>
              <AiTwotoneBank />
              <input
                type="nomefazenda"
                placeholder="Digite o nome da fazenda"
                onChange={(e) => setNomeFazenda(e.target.value)}
                value={nomeFazenda}
              />
            </div>
            <div className={styles["login-loginInputEmail"]}>
              <MdEmail />
              <input
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles["login-loginInputEmail"]}>
              <HiPhone />
              <input
                type="telefone"
                placeholder="Digite seu telefone de contato"
                onChange={(e) => setTelefone(e.target.value)}
                value={telefone}
              />
            </div>
            <div className={styles["login-loginInputEmail"]}>
              <HiFolder />
              <input
                type="assunto"
                placeholder="Digite o assunto a ser tratado"
                onChange={(e) => setAssunto(e.target.value)}
                value={assunto}
              />
            </div>
            <div className={styles["login-loginInputEmail"]}>
              <HiChatAlt2 />
              <input
                type="duvida"
                placeholder="Digite sua dúvida"
                onChange={(e) => setDuvida(e.target.value)}
                value={duvida}
              />
            </div>

            <button type="submit">Encaminhar</button>
          </div>
        </form>
          <div>
            <div className={styles["contato"]}>
              <h1>Informações de contato</h1>
              <div style={{ color: "#000" }}>
                <p>
                  <MdLocationPin style={{ color: "#1D4D16" }} /> Rua Major Gote,
                  n°800 - Caiçaras
                </p>
                <p>Patos de Minas - MG - CEP:38702-054</p>
                <p>
                  <HiPhone style={{ color: "#1D4D16" }} /> Telefone: (34) 9
                  9140-8502
                </p>
                <p>
                  <MdEmail style={{ color: "#1D4D16" }} /> Email:
                  projetoagrotech@gmail.com
                </p>
              </div>
            </div>
            <div className={styles["contato"]}>
              <h1 style={{ marginTop: "5px" }}>Fala com o suporte</h1>
              <p
                style={{
                  marginLeft: "20px",
                  marginBottom: "10px",
                  marginTop: "-2px",
                }}
              >
                Estamos disponíveis, também, através do nosso WhatsApp.
              </p>
              <p style={{ marginRight: "95px", fontWeight: "600" }}>
                Seg - Sex: 6h - 20h
              </p>
              <p
                style={{
                  marginRight: "90px",
                  marginBottom: "10px",
                  fontWeight: "600",
                }}
              >
                Sáb - Dom: 6h - 17h
              </p>
              <button type="submit">
                <a href={"https://api.whatsapp.com/send?phone=5534991408502"}>
                  <BsWhatsapp
                    style={{ marginBottom: "-2px", marginRight: "5px" }}
                  />{" "}
                  Clique aqui
                </a>
              </button>
            </div>
          </div>
        </div>
      
    </div>
  );
}
