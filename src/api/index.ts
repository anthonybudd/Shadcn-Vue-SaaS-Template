import Auth from './Auth';
import User from './User';

class API {
    JWT: string | null = null;
    auth: Auth | null = null;
    user: User | null = null;

    constructor(JWT: string) {
        this.setJWT(JWT);
    }

    setJWT(JWT: string) {
        this.JWT = JWT;
        this.auth = new Auth(JWT);
        this.user = new User(JWT);
    }

    getJWT() {
        return this.JWT;
    }
}

let instance;
if (!instance) instance = new API('');
export default instance as any;
