import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    get isLoggedIn() {
        return !!sessionStorage.getItem('loggedin');
    }
    private defaultPassword = 'password';

    constructor() { }

    getPassword() {
        return localStorage.getItem('app_password');
    }

    savePassworrd(newPassword) {
        localStorage.setItem('app_password', newPassword);
    }

    logout() {
        sessionStorage.removeItem('loggedin');
    }

    login(password) {
        const passwordInSystem = this.getPassword();
        if (passwordInSystem) {
            const result = passwordInSystem === password;
            if (result) {
                sessionStorage.setItem('loggedin', 'true');
            }
            return passwordInSystem === password;
        }

        const resultDefault = this.defaultPassword === password;
        if (resultDefault) {
            sessionStorage.setItem('loggedin', 'true');
        }
        return resultDefault;
    }

}
