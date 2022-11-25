import React from "react";
import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { HiPhone, HiChatAlt2, HiUser, HiFolder } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import { AiTwotoneBank } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import SideBar from "../../components/SideBar";

export default function Suporte() {
  return (
    <div className={styles["container"]}>
      <SideBar colorIcons={"#FFFFFF"} backgroundColor={"#1D4D16"} />
      <div className={styles["suporte"]}>
        <div className={styles["login-right"]}>
          <h1>Contate-nos</h1>
          <p>Para dúvidas, preencha o formulário abaixo.</p>
          <div className={styles["login-loginInputEmail"]}>
            <HiUser />
            <input
              type="nome"
              placeholder="Digite seu nome"
            />
          </div>
          <div className={styles["login-loginInputEmail"]}>
            <AiTwotoneBank />
            <input
              type="nome"
              placeholder="Digite o nome da fazenda"
            />
          </div>
          <div className={styles["login-loginInputEmail"]}>
            <MdEmail />
            <input
              type="email"
              placeholder="Digite seu email"
            />
          </div>
          <div className={styles["login-loginInputEmail"]}>
            <HiPhone />
            <input
              type="telefone"
              placeholder="Digite seu telefone de contato"
            />
          </div>
          <div className={styles["login-loginInputEmail"]}>
            <HiFolder />
            <input
              type="text"
              placeholder="Digite o assunto a ser tratado"
            />
          </div>
          <div className={styles["login-loginInputEmail"]}>
            <HiChatAlt2 />
            <input
              type="text"
              placeholder="Digite sua dúvida"
            />
          </div>
          
          <button type="submit">Encaminhar</button>
        </div>

        <div>
          <div className={styles["contato"]}>
            <h1>Informações de contato</h1>
            <div style={{color:'#000'}}>
              <p><MdLocationPin style={{color:"#1D4D16"}}/> Rua Major Gote, n°800 - Caiçaras</p>
              <p>Patos de Minas - MG - CEP:38702-054</p>
              <p><HiPhone style={{color:"#1D4D16"}}/> Telefone: (34) 9 9140-8502</p>
              <p><MdEmail style={{color:"#1D4D16"}}/> Email: projetoagrotech@gmail.com</p>
            </div>
          </div>
          <div className={styles["contato"]}>
            <h1 style={{ marginTop:'5px'}}>Fala com o suporte</h1>
            <p style={{marginLeft:'20px', marginBottom:'10px', marginTop:'-2px'}}>Estamos disponíveis, também, através do nosso WhatsApp.</p>
            <p style={{marginRight:'95px', fontWeight:'600'}}>Seg - Sex: 6h - 20h</p>
            <p style={{marginRight:'90px', marginBottom:'10px', fontWeight:'600'}}>Sáb - Dom: 6h - 17h</p>
            <button type="submit"><a href={'https://api.whatsapp.com/send?phone=5534991408502'}><BsWhatsapp style={{ marginBottom:'-2px', marginRight:'5px'}}/> Clique aqui</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}