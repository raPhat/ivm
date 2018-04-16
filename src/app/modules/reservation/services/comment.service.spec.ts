import { TestBed, inject, async } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { DatabaseService } from '../../shared/services/database.service';

describe('CommentService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommentService, DatabaseService]
        });
    });

    it('should be created', inject([CommentService], (service: CommentService) => {
        expect(service).toBeTruthy();
    }));

    describe('getCommentList()', () => {
        it('should be get all comments', async(inject([CommentService], (service: CommentService) => {
            const mock = [
                {
                    no: 'c1',
                    content: 'Fugiat non id exercitation aliquip commodo veniam sit adipisicing.'
                },
                {
                    no: 'c2',
                    content: 'Proident occaecat aliquip do est non mollit laborum consectetur Lorem.'
                }
            ];
            const dbSpy = spyOn(service.db, 'getDatabase').and.returnValue(Promise.resolve({
                data: mock
            }));
            service.getCommentList().then((data) => {
                expect(data).toEqual(mock);
                expect(data.length).toEqual(2);
                expect(dbSpy).toHaveBeenCalled();
            });
        })));
    });

    describe('comment()', () => {
        it('should be save comment', inject([CommentService], (service: CommentService) => {
            service.db.comments = <any> {
                insert: (comment) => {}
            };
            const mock = {
                no: 'c1',
                content: 'Occaecat irure amet labore irure nisi tempor pariatur dolor Lorem ad duis reprehenderit aliqua esse.'
            };
            const commentSpy = spyOn(service.db.comments, 'insert');
            const dbSpy = spyOn(service.db, 'saveDatabase');
            service.comment(mock);
            expect(commentSpy).toHaveBeenCalledWith(mock);
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('remove()', () => {
        it('should be remove comment', inject([CommentService], (service: CommentService) => {
            service.db.comments = <any> {
                findOne: (obj) => {},
                remove: (comment) => {}
            };
            const mock = {
                $loki: 1,
                no: 'c1',
                content: 'Occaecat irure amet labore irure nisi tempor pariatur dolor Lorem ad duis reprehenderit aliqua esse.'
            };
            const findOneSpy = spyOn(service.db.comments, 'findOne').and.returnValue(mock);
            const removeSpy = spyOn(service.db.comments, 'remove');
            const dbSpy = spyOn(service.db, 'saveDatabase');
            service.remove(mock);
            expect(findOneSpy).toHaveBeenCalled();
            expect(removeSpy).toHaveBeenCalledWith(mock);
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('update()', () => {
        it('should be update comment', inject([CommentService], (service: CommentService) => {
            service.db.comments = <any> {
                findOne: (obj) => {},
                update: (comment) => {}
            };
            const mock = {
                $loki: 1,
                no: 'c1',
                content: 'Occaecat irure amet labore irure nisi.'
            };
            const findOneSpy = spyOn(service.db.comments, 'findOne').and.returnValue(mock);
            const updateSpy = spyOn(service.db.comments, 'update');
            const dbSpy = spyOn(service.db, 'saveDatabase');
            service.update({
                $loki: 1,
                no: 'c1',
                content: 'Lorem ad duis reprehenderit aliqua esse.'
            });
            expect(findOneSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalledWith({
                $loki: 1,
                no: 'c1',
                content: 'Lorem ad duis reprehenderit aliqua esse.'
            });
            expect(dbSpy).toHaveBeenCalled();
        }));
    });

    describe('getCommentsByBuilding()', () => {
        it('should be get all comments of building by no building', async(inject([CommentService], (service: CommentService) => {
            const dbSpy = spyOn(service, 'getCommentList').and.returnValue(Promise.resolve([
                {
                    no: 'c1',
                    content: 'Fugiat non id exercitation aliquip commodo veniam sit adipisicing.'
                },
                {
                    no: 'c2',
                    content: 'Proident occaecat aliquip do est non mollit laborum consectetur Lorem.'
                }
            ]));
            service.getCommentsByBuilding('c2').then((data) => {
                expect(data).toEqual([
                    {
                        no: 'c2',
                        content: 'Proident occaecat aliquip do est non mollit laborum consectetur Lorem.'
                    }
                ]);
                expect(data.length).toEqual(1);
                expect(dbSpy).toHaveBeenCalled();
            });
        })));
    });
});
