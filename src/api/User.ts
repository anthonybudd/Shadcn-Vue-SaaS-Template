import Service from './Service';

class User extends Service {
    get() {
        return this.axios.get('/user');
    }

    update(user: any) {
        return this.axios.post(`/user`, user);
    }

    resendVerificationEmail() {
        return this.axios.post(`/user/resend-verification-email`);
    }

    updatePassword(password: any) {
        return this.axios.post(`/user/update-password`, password);
    }

    switchGroup(groupID: string) {
        return this.axios.post(`/user/switch-group`, { groupID });
    }
}

export default User;
