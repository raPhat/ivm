import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BsDatepickerModule, PopoverModule } from 'ngx-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardComponent } from './comment-card.component';
import { CommentService } from '../../services/comment.service';
import { DatabaseService } from '../../../shared/services/database.service';

describe('CommentCardComponent', () => {
    let component: CommentCardComponent;
    let fixture: ComponentFixture<CommentCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ CommentCardComponent ],
        imports: [
            BsDatepickerModule,
            PopoverModule.forRoot(),
            QuillModule,
            ReactiveFormsModule,
            FormsModule,
            ReactiveFormsModule,
        ],
        providers: [
            CommentService,
            DatabaseService
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentCardComponent);
        component = fixture.componentInstance;
        component.comment = {
            no: '',
            content: ''
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('remove()', () => {
        it('should be call remove() and emit update', () => {
            const removeSpy = spyOn(component.commentService, 'remove');
            const emitSpy = spyOn(component.updated, 'emit');
            component.remove();
            expect(removeSpy).toHaveBeenCalled();
            expect(emitSpy).toHaveBeenCalled();
        });
    });

    describe('edit()', () => {
        it('should be call edit() and emit update', () => {
            const updateSpy = spyOn(component.commentService, 'update');
            const emitSpy = spyOn(component.updated, 'emit');
            component.edit();
            expect(updateSpy).toHaveBeenCalled();
            expect(emitSpy).toHaveBeenCalled();
            expect(component.mode).toEqual('view');
        });
    });
});
