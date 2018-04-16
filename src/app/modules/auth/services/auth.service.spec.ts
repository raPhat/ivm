import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    describe('getPassword()', () => {
        it('should be get password from localstorage', inject([AuthService], (service: AuthService) => {
            const getSpy = spyOn(localStorage, 'getItem').and.returnValue('1234567890');
            expect(service.getPassword()).toEqual('1234567890');
            expect(getSpy).toHaveBeenCalled();
        }));
    });

    describe('savePassworrd()', () => {
        it('should be set password to localstorage', inject([AuthService], (service: AuthService) => {
            const setSpy = spyOn(localStorage, 'setItem');
            service.savePassworrd('123456');
            expect(setSpy).toHaveBeenCalled();
        }));
    });

    describe('login()', () => {
        it('should be login success by password', inject([AuthService], (service: AuthService) => {
            const getSpy = spyOn(localStorage, 'getItem').and.returnValue('1234567890');
            expect(service.login('1234567890')).toBeTruthy();
        }));
        it('should be login fail by wrong password', inject([AuthService], (service: AuthService) => {
            const getSpy = spyOn(localStorage, 'getItem').and.returnValue('1234567890');
            expect(service.login('1111')).toBeFalsy();
        }));
    });

    describe('logout()', () => {
        it('should be logout and remove session storage', inject([AuthService], (service: AuthService) => {
            const removeSpy = spyOn(sessionStorage, 'removeItem');
            service.logout();
            expect(removeSpy).toHaveBeenCalled();
        }));
    });

    describe('isLoggedIn getter()', () => {
        it('should be get TRUE if logged in', inject([AuthService], (service: AuthService) => {
            const getSpy = spyOn(sessionStorage, 'getItem').and.returnValue(true);
            expect(service.isLoggedIn).toBeTruthy();
            expect(getSpy).toHaveBeenCalled();
        }));

        it('should be get FALSE if not logged in', inject([AuthService], (service: AuthService) => {
            const getSpy = spyOn(sessionStorage, 'getItem').and.returnValue(false);
            expect(service.isLoggedIn).toBeFalsy();
            expect(getSpy).toHaveBeenCalled();
        }));
    });
});
