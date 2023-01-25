import { loginRepository } from '../repository/loginRepository.js';

export class LoginService {
    static doLogin(req){
        return loginRepository.doLogin(req);
    }
}