import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedinGuard } from './loggedin.guard';

describe('LoggedinGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoggedinGuard,
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

    it('should be navigate to overview if logged in', inject([LoggedinGuard], (guard: LoggedinGuard) => {
        const authSpy = spyOnProperty(guard.authService, 'isLoggedIn', 'get').and.returnValue(true);
        expect(guard.canActivate(null, null)).toBeTruthy();
        expect(authSpy).toHaveBeenCalled();
    }));

    it('should be not navigate to overview if not logged in', inject([LoggedinGuard], (guard: LoggedinGuard) => {
        const authSpy = spyOnProperty(guard.authService, 'isLoggedIn', 'get').and.returnValue(false);
        expect(guard.canActivate(null, null)).toBeFalsy();
        expect(authSpy).toHaveBeenCalled();
    }));
});
