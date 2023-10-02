import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { SingleListingComponent } from './single-listing/single-listing.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LandingPageComponent,
    ListingsComponent,
    SingleListingComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    SharedModule
  ]
})
export class MarketplaceModule { }
