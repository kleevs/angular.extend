import { Injectable } from '@angular/core';
import { Database } from '../../tools/database/db';
import { User } from '../model/user';
import { toTime, parseTime } from '../../tools/date';


declare type Data = {
    id?: number;
    lastName: string;
    firstName: string;
    birthDate: number;
    isActif: boolean;
    login: string;
    password: string;
};

@Injectable()
export class UserDatabase {
    private db: Database<Data>;
    constructor() {
        this.db = new Database<Data>("db.ng.user-manager.user");
    }

    public create(user: User) {
        this.db.insert({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: toTime(user.birthDate),
            login: user.login,
            password: user.password,
            isActif: user.isActif
        });
    }

    public update(user: User) {
        this.db.update({ id: user.id }, {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: toTime(user.birthDate),
            login: user.login,
            password: user.password,
            isActif: user.isActif
        });
    }

    public list(criteria: any) {
        return this.db.find(criteria).map(u => {
            var user = new User();
            user.id = u.id;
            user.firstName = u.firstName,
            user.lastName = u.lastName,
            user.birthDate = parseTime(u.birthDate),
            user.login = u.login,
            user.password = u.password,
            user.isActif = u.isActif
            return user;
        });        
    }

    public remove(user: User) {
        this.db.remove({ id: user.id });
    }
}