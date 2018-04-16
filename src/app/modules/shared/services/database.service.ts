import { Injectable } from '@angular/core';
import * as loki from 'lokijs';
// import { Collection } from 'lokijs';

@Injectable()
export class DatabaseService {

    db: Loki;
    building: loki.Collection;
    reservation: loki.Collection;
    comments: loki.Collection;

    constructor() {
        // this.initial();
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
                const reservation = this.db.getCollection('reservation');
                if (!reservation) {
                    this.db.addCollection('reservation');
                    this.save();
                } else {
                    this.reservation = reservation;
                }
            });
        }
    }

    getDatabase(name) {
        return new Promise((resolve) => {
            if (this[name]) {
                resolve(this[name]);
            } else {
                const path = this.getDatabasePath();
                this.db = new loki(path + '/db.json');
                this.db.loadDatabase({}, () => {
                    setTimeout(() => {
                        const table = this.db.getCollection(name);
                        if (table) {
                            this[name] = table;
                        } else {
                            this[name] = this.db.addCollection(name);
                            this.save();
                        }
                        resolve(this[name]);
                    }, 1000);
                });
            }
        });
    }

    save() {
        this.db.save();
    }

    saveDatabase() {
        this.db.saveDatabase();
    }

    getDatabasePath() {
        return localStorage.getItem('db_path');
    }

    setDatabasePath(path) {
        localStorage.setItem('db_path', path);
        this.initial();
    }

}
