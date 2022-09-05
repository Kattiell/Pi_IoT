import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/index';
import SignUp from './Pages/SignUp/index';
import './global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
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
                <Route path="/" element={<Home />} /> {/* Página inicial da aplicação */}
                <Route path="/login" element={<Login />} />
                <Route path="/cadastre-se" element={<SignUp />} />
            </Routes>

        </BrowserRouter>
    </React.StrictMode>
);
