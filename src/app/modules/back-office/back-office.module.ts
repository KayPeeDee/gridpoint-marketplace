import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import {SharedModule} from "../shared/shared.module";
import { BackOfficeComponent } from './back-office.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';


@NgModule({
    declarations: [
        BackOfficeComponent,
        AdminNavigationComponent
    ],
    exports: [
        AdminNavigationComponent
    ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        SharedModule
    ]
})
export class BackOfficeModule { }
