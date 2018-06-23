import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { UserDatabase } from '../database/user';
import { UserValidation } from '../validation/user';
import { Ajax } from '../../tools/service/ajax';

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
export class UserService {
    constructor(
        private userDatabase: UserDatabase, 
        private userValidation: UserValidation, 
        private ajax: Ajax
    ) {
    }

    public create(user: User) {
        return this.ajax.do(() => {
            this.userValidation.assertIsValid(user);
            this.userDatabase.create(user);
        });
    }

    public update(user: User) {
        return this.ajax.do(() => {
            this.userValidation.assertIsValid(user);
            this.userDatabase.update(user);
        });
    }

    public list(criteria?: any) {
        return this.ajax.do(() => {
            return this.userDatabase.list(criteria);
        });
    }

    public remove(user: User) {
        return this.ajax.do(() => {
            this.userDatabase.remove(user);
        });
    }
}