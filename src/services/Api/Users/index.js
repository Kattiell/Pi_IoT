
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