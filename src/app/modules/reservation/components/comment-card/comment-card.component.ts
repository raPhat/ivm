import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IComment } from './../../models/iComment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

    @Input() comment: IComment;
    @Output() updated = new EventEmitter();

    public isOpen = false;
    public mode: 'view' | 'edit' = 'view';
    public options = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'bullet' }],
            ['clean'],
        ]
    };
    public commentForm: FormGroup;

    constructor(
        public commentService: CommentService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            content: [this.comment.content, Validators.required]
        });
    }

    remove() {
        this.commentService.remove(this.comment);
        this.updated.emit();
    }

    edit() {
        this.commentService.update({
            ...this.comment,
            content: this.commentForm.get('content').value
        });
        this.updated.emit();
        this.mode = 'view';
    }

}
