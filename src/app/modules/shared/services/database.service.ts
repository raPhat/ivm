import { Injectable } from '@angular/core';
import * as loki from 'lokijs';
import { Collection } from 'lokijs';

@Injectable()
export class DatabaseService {

    db: Loki;
    building: Collection;

    constructor() {
        this.initial();
    }

    initial() {
        const path = this.getDatabasePath();
        if (path) {
            this.db = new loki(path + '/db.json');
            this.db.loadDatabase({}, () => {
                const building = this.db.getCollection('building');
                if (!building) {
                    this.db.addCollection('building');
                    this.save();
                } else {
                    this.building = building;
                }
            });
        }
    }

    save() {
        this.db.save();
    }

    getDatabasePath() {
        return localStorage.getItem('db_path');
    }

    setDatabasePath(path) {
        localStorage.setItem('db_path', path);
        this.initial();
    }

}
