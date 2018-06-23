import { ViewModule } from 'angular.extend';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StartupComponent } from './startup.component';
import { UserService } from '../service/user';
import { UserDatabase } from '../database/user';
import { UserValidation } from '../validation/user';
import { Ajax } from '../../tools/service/ajax';
import { TryCatch } from '../../tools/service/trycatch';
import { Router } from '../../tools/service/router';
import { DateDirective } from '../../tools/directive/date';
import { HrefDirective } from '../../tools/directive/href';

@ViewModule({
    imports: [BrowserModule, FormsModule],
    declarations: [StartupComponent, DateDirective, HrefDirective],
    bootstrap: [StartupComponent],
    providers: [
        UserService,
        UserDatabase,
        Ajax,
        TryCatch,
        UserValidation,
        Router
    ]
})
export class StartupModule {
}
