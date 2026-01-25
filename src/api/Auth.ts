import Service from './Service';

class Auth extends Service {
    authcheck() {
        return this.axios.get('/_authcheck');
    }

    requiresMFA(email: string) {
        return this.axios.post(`/auth/login/mfa`, { email });
    }

    login(auth: any) {
        return this.axios.post(`/auth/login`, auth);
    }

    signUp(signUp: any) {
        return this.axios.post(`/auth/sign-up`, signUp);
    }

    verifyEmail(emailVerificationKey: string) {
        return this.axios.get(`/auth/verify-email/${emailVerificationKey}`);
    }

    forgotPassword(data: any) {
        return this.axios.post(`/auth/forgot`, data);
    }

    getUserByResetKey(passwordResetKey: string) {
        return this.axios.get(`/auth/get-user-by-reset-key/${passwordResetKey}`);
    }

    getUserByInviteKey(inviteKey: string) {
        return this.axios.get(`/auth/get-user-by-invite-key/${inviteKey}`);
    }

    signUpWithInvite(data: any) {
        return this.axios.post(`/auth/sign-up/invite`, data);
    }

    resetPassword(data: any) {
        return this.axios.post(`/auth/reset`, data);
    }

    enableMFA(data: any) {
        return this.axios.post(`/auth/enable-mfa`, data);
    }

    confirmMFA(data: any) {
        return this.axios.post(`/auth/confirm-mfa`, data);
    }

    disableMFA(data: any) {
        return this.axios.post(`/auth/disable-mfa`, data);
    }
}

export default Auth;
