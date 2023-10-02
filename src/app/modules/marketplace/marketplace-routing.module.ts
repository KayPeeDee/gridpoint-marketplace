import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ListingsComponent} from "./listings/listings.component";
import {SingleListingComponent} from "./single-listing/single-listing.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'listings',
    component: ListingsComponent
  },
  {
    path: 'listings/single',
    component: SingleListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
