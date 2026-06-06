import api from "@/src/services/api";
import { userCad } from "./user.type";


export async function cadastrarUserService(data: userCad){
    try{
        const response = await api.post("/user/cadastrar", data);
        console.log(response?.data)
        return response;
    }catch(error: any){
        throw error?.response?.data ? error?.response?.data : 'Ocorreu um problema ao tentar se cadastrar !'
    }
}