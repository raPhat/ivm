import { AuthService } from './auth.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { Router } from '@angular/router';

describe('GuestGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GuestGuard,
                AuthService,
                {
                    provide: Router,
                    useValue: {
                        navigate: () => {}
                    }
                }
            ]
        });
    });

    it('should be navigate to overview if logged in', inject([GuestGuard], (guard: GuestGuard) => {
        const authSpy = spyOnProperty(guard.authService, 'isLoggedIn', 'get').and.returnValue(true);
        const routerSpy = spyOn(guard.router, 'navigate');
        expect(guard.canActivate(null, null)).toBeFalsy();
        expect(authSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
    }));

    it('should be not navigate to overview if not logged in', inject([GuestGuard], (guard: GuestGuard) => {
        const authSpy = spyOnProperty(guard.authService, 'isLoggedIn', 'get').and.returnValue(false);
        const routerSpy = spyOn(guard.router, 'navigate');
        expect(guard.canActivate(null, null)).toBeTruthy();
        expect(authSpy).toHaveBeenCalled();
        expect(routerSpy).not.toHaveBeenCalled();
    }));
});
