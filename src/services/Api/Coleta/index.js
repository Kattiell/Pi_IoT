
import api from ".."
import { ToastError } from "../../Toast"

export async function ListColetas(fazendaId){
    
    let list;
    
    await api.get(`coletas/listaColetas?fazendaId=${fazendaId}`)
    .then((result)=>{
        list = result.data.data;
    }).catch((error)=>{
        ToastError("Erro ao listar coletas anteriores.");
    })

    return list;
}