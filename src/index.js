import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*
            A cada nova página criada em Pages, é necessário chamar um novo 
            componente <Route ... /> na lista de <Routes> abaixo.
            
            -> path é o nome da rota
            -> element é o componente da página, criado em Pages
        
        */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Página inicial da aplicação */}
        <Route path="/Login" element={<Login />} />
        <Route path="/cadastre-se" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </React.StrictMode>
);
