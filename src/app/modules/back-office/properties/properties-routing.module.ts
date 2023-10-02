import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPropertyComponent} from "./add-property/add-property.component";
import {PropertiesComponent} from "./properties.component";
import {ListMyPropertiesComponent} from "./list-my-properties/list-my-properties.component";

const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      {
        path: 'add-property',
        component: AddPropertyComponent
      },
      {
        path: 'list/my-properties',
        component: ListMyPropertiesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
