import { View } from 'angular.extend';
import { UserService } from '../../service/user';
import { User } from '../../model/user';

export abstract class HomeView {}

@View({
    html: './dist/app/view/home/home.html'
})
class Home extends HomeView {
    private list: User[];
    constructor(private userService: UserService) {
        super();
        this.list = [];
        userService.list().then(users => this.list = users);
    }

    remove(user: User) {
        this.userService.remove(user);
        this.userService.list().then(users => this.list = users);
        return true;
    }
}