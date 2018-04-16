import { IComment } from './../models/iComment';
import { DatabaseService } from './../../shared/services/database.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CommentService {

    private DBName = 'comments';

    constructor(
        public db: DatabaseService
    ) { }

    getCommentList(): Promise<IComment[]> {
        return this.db.getDatabase(this.DBName).then((table: any) => {
            return table.data;
        });
    }

    comment(comment: IComment) {
        this.db.comments.insert(comment);
        this.db.saveDatabase();
    }

    remove(comment: IComment) {
        const c = this.db.comments.findOne({'$loki': comment.$loki});
        this.db.comments.remove(c);
        this.db.saveDatabase();
    }

    update(comment: IComment) {
        const c = this.db.comments.findOne({'$loki': comment.$loki});
        c.content = comment.content;
        this.db.comments.update(c);
        this.db.saveDatabase();
    }

    getCommentsByBuilding(no: string): Promise<IComment[]> {
        return this.getCommentList().then(list => {
            return _.filter(list, { no });
        });
    }

}
