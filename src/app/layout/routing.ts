import { Routes } from "@angular/router";
import {AuthGuard} from "../_helpers/guards/auth.guard";

export const ROUTING: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('../modules/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: 'gd-admin',
  //   loadChildren: () => import('../modules/back-office/back-office.module').then(m => m.BackOfficeModule),
  //   canActivate: [AuthGuard]
  // },
];
