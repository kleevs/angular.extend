import { View } from 'angular.extend';
import { UserService } from '../../service/user';
import { Router } from '../../../tools/service/router';
import { UserValidation } from '../../validation/user';
import { User } from '../../model/user';
import { UserError } from '../../model/error/userError';

export abstract class DetailView {
    abstract setUser(id: number): void;
}

@View({
    html: './dist/app/view/detail/detail.html'
})
class Detail extends DetailView {
    user: User;
    constructor(private userService: UserService, private router: Router) {
        super();
        this.user = new User();
    }

    setUser(id: number): void {
        this.userService.list({ id: id }).then(list => {
            var user = list[0];

            if (user) {
                this.user.id = user.id;
                this.user.firstName = user.firstName;
                this.user.lastName = user.lastName;
                this.user.birthDate = user.birthDate;
                this.user.login = user.login;
                this.user.password = user.password;
                this.user.isActif = user.isActif;
            }
        });
    }

    save() {
        // this.observable.errors.firstName = false;
        // this.observable.errors.lastName = false;
        // this.observable.errors.birthDate = false;
        // this.observable.errors.login = false;
        // this.observable.errors.password = false;

        (!this.user.id && 
            this.userService.create(this.user) || 
            this.userService.update(this.user))
        .then(() => {
            this.router.trigger("./#/");
        }).catch(exception => {
            if (exception instanceof UserError) {
                exception.forEach((error) => {
                    if (error.getCode() === UserValidation.ErrorCode.lastName) {
                        // this.observable.errors.lastName = true;
                    }
        
                    if (error.getCode() === UserValidation.ErrorCode.firstName) {
                        // this.observable.errors.firstName = true;
                    }
        
                    if (error.getCode() === UserValidation.ErrorCode.birthDate) {
                        // this.observable.errors.birthDate = true;
                    }
        
                    if (error.getCode() === UserValidation.ErrorCode.firstName) {
                        // this.observable.errors.firstName = true;
                    }
        
                    if (error.getCode() === UserValidation.ErrorCode.login) {
                        // this.observable.errors.login = true;
                    }
        
                    if (error.getCode() === UserValidation.ErrorCode.password) {
                        // this.observable.errors.password = true;
                    }

                    return false;
                });
            } else {
                throw exception;
            }
        });

        return true;
    }
}