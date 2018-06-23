import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { UserError } from '../model/error/userError';
import { TryCatch } from '../../tools/service/trycatch';

@Injectable()
export class UserValidation {
    static ErrorCode = {
        firstName: "UserValidation.FN",
        lastName: "UserValidation.LN",
        birthDate: "UserValidation.BD",
        login: "UserValidation.LG",
        password: "UserValidation.PW"
    }

    constructor(private tryCatch: TryCatch) {
    }

    public assertIsValid(user: User) {
        this.tryCatch.try(() => {
            if (!user.firstName) {
                throw new UserError(UserValidation.ErrorCode.firstName);
            } 
        }).then(() => {
            if (!user.lastName) {
                throw new UserError(UserValidation.ErrorCode.lastName);
            } 
        }).then(() => {
            if (!user.birthDate) {
                throw new UserError(UserValidation.ErrorCode.birthDate);
            } 
        }).then(() => {
            if (!user.login) {
                throw new UserError(UserValidation.ErrorCode.login);
            } 
        }).then(() => {
            if (!user.password) {
                throw new UserError(UserValidation.ErrorCode.password);
            } 
        }).catch(errors => {
            throw new UserError(errors.filter(_ => _));
        });
    }
}