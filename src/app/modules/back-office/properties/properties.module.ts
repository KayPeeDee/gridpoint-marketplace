import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertiesComponent } from './properties.component';
import {BackOfficeModule} from "../back-office.module";
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ListMyPropertiesComponent } from './list-my-properties/list-my-properties.component';
import { PropertyOwnershipComponent } from './property-ownership/property-ownership.component';
import { CreatePropertyOwnerComponent } from './property-ownership/create-property-owner/create-property-owner.component';


@NgModule({
  declarations: [
    AddPropertyComponent,
    PropertiesComponent,
    ListMyPropertiesComponent,
    PropertyOwnershipComponent,
    CreatePropertyOwnerComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatIconModule,
    MatStepperModule,
    SharedModule,
    BackOfficeModule
  ]
})
export class PropertiesModule { }
