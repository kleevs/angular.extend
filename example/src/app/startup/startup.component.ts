import {Component } from '@angular/core';
import { ViewProvider } from 'angular.extend';
import { HomeView } from '../view/home/home.view';
import { DetailView } from '../view/detail/detail.view';
import { Router } from '../../tools/service/router';

@Component({
    selector: 'my-app',
    templateUrl: './dist/app/startup/startup.component.html',
    styles: ['']
})
export class StartupComponent {
    private root;

    constructor(viewProvider: ViewProvider, router: Router) {
        router.on((href: string, pathname: string, hash: string) => {
            var thref = hash.split("/");
            var view = thref[1];
            var id = parseInt(thref[2]) || 0;

            if (view === "detail") {
                this.root = viewProvider.create(DetailView);
                (<DetailView>this.root).setUser(id);
            } else {
                this.root = viewProvider.create(HomeView);
            }
        });
    }
}
