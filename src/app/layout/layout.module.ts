import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import {ROUTING} from "./routing";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { FooterComponent } from './components/footer/footer.component';
import {SharedModule} from "../modules/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: ROUTING
  }
]

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LayoutModule {}
