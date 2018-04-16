import { TestBed, inject } from '@angular/core/testing';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [DatabaseService]
        });
    });

    it('should be created', inject([DatabaseService], (service: DatabaseService) => {
        expect(service).toBeTruthy();
    }));

    // describe('save()', () => {
    //     it('should be call db.save()', inject([DatabaseService], (service: DatabaseService) => {
    //         const dbSpy = spyOn(service.db, 'save');
    //         service.save();
    //         expect(dbSpy).toHaveBeenCalled();
    //     }));
    // });

    // describe('saveDatabase()', () => {
    //     it('should be call db.saveDatabase()', inject([DatabaseService], (service: DatabaseService) => {
    //         const dbSpy = spyOn(service.db, 'saveDatabase');
    //         service.saveDatabase();
    //         expect(dbSpy).toHaveBeenCalled();
    //     }));
    // });
});
