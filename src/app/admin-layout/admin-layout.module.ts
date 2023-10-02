import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../modules/shared/shared.module";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    RouterOutlet,
    SharedModule
  ]
})
export class AdminLayoutModule { }
