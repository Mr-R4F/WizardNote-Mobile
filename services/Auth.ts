import { LoginService, RegisterService } from '@/types/type';
import Cookies from 'js-cookie';
import { axiosInstanceAPI } from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
    async register({ nome, email, senha }: RegisterService) {
        try {
            const res = await axiosInstanceAPI.post('usuario', {
                nome,
                email,
                senha
            });

            return res;
        } catch (err: any) {
            return err;
        }
    }

    async login({ email, senha }: LoginService) {
        try {
            const res = await axiosInstanceAPI.post('auth/login', { email, senha });
            console.log(res, res.data!.access_token, { expires: res.data!.expires_in })

           if (res.status === 201) await AsyncStorage.setItem('auth_token', res.data!.access_token);

            return res;
        } catch (err: any) {
            console.log(err)
            return err;
        }
    }

    async logout() {
        try {
            const token: string | undefined = Cookies.get('auth_token');
            const res = await axiosInstanceAPI.delete('auth/logout', { headers: { Authorization: `Bearer ${token}` } });

            if (res.status === 200) ['user_id', 'user_role', 'auth_token'].map((el: string) => Cookies.remove(`${el}`));

            return res;
        } catch (err: unknown) {
            console.log(err);
        }
    }
}

export default new AuthService();