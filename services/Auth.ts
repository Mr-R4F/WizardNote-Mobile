/* import { LoginService, RegisterService } from "../types/type"; */
import Cookies from 'js-cookie';
import { axiosInstanceAPI } from "../config/axios";
import { LoginService, RegisterService } from '@/types/type';

class AuthService {
    async register({ nome, email, senha }: RegisterService) {
        try {
            const res = await axiosInstanceAPI.post('auth/register', { 
                nome,
                email, 
                senha
            });
            
            return res;
        } catch (err: unknown) {
            console.log(err);
        }
    }
 
    async login({ email, senha }: LoginService) {
        try {
            const expires: number = 3;

            const res = await axiosInstanceAPI.post('auth/login', { email, senha });
            console.log(res)
           /*  if(res.status === 200) Cookies.set('auth_token', res.data!.data.authorization.token, { expires });
            
            return res; */
        } catch (err: unknown) {
            console.log(err)
            return err;
        }
    }

    async logout() {
        try {
            const token: string | undefined = Cookies.get('auth_token');
            const res = await axiosInstanceAPI.delete('auth/logout', { headers: { Authorization: `Bearer ${token}` }});

            if(res.status === 200) ['user_id', 'user_role', 'auth_token'].map((el: string) => Cookies.remove(`${el}`));
            
            return res;
        } catch (err: unknown) {
            console.log(err);
        }
    }
}

export default new AuthService();