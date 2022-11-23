
import { ToastError, ToastSucess } from "../../Toast";
import api from './../../Api/index';

export async function CadastrarUsuario(nome, email, password, nomeFazenda){
   
    try {
        
        await api.post('user/cadastrar',{
            nome: nome, 
            email: email, 
            password: password, 
            nomeFazenda: nomeFazenda
        });

        ToastSucess("Usuário cadastrado com sucesso!");

    } catch (error) {
        console.log(error);
        ToastError("Falha ao cadastrar usuário. " + error);
    }

}

export async function LoginUsuario(email, password){

    try {
        await api.post('user/login',{
            email: email, 
            password: password, 
        });

        ToastSucess("Logado com sucesso!");
        return true;

    } catch (error) {
        console.log(error);
        ToastError("Falha no login, verifique suas credenciais.");
        return false;
    }

}

export async function IsUserLogged(){

    try {
        const response = await api.get('user/isLogged');
        return response.data.data;

    } catch (error) {
        ToastError("Erro ao validar token.");
    }

}