import { cadastrarUserService } from "./user.services";
import { userCad } from "./user.type";

export function useUser() {

    async function cadastrarUsuario(data: userCad) {
        try {
            const response = await cadastrarUserService(data);
            return response;
        } catch (error: any) {
            console.log(error?.response?.data);
            throw error;
        }
    }

    return { cadastrarUsuario }
}