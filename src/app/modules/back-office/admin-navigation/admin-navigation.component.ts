import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit{

  items: MenuItem[]=[];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-palette',
        routerLink:"/gd-admin/dashboard"
      },
      {
        label: 'Properties',
        icon: 'pi pi-fw pi-home',
        items: [
          {
            label: 'Add Property',
            icon: 'pi pi-fw pi-plus',
            routerLink:"/gd-admin/properties/add-property"
          },
          {
            label: 'My Properties',
            icon: 'pi pi-fw pi-list',
            routerLink: '/gd-admin/properties/list/my-properties'
          },
          {
            label: 'Public Listings',
            icon: 'pi pi-fw pi-list'
          }
        ]
      },
      {
        label: 'Profiles',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Personal Profile',
            icon: 'pi pi-fw pi-user',
            // routerLink:"/gd-admin/properties/add-property"
          },
          {
            label: 'Business Profile',
            icon: 'pi pi-fw pi-list'
          },

        ]
      },
      {
        label: 'Bookmarks',
        icon: 'pi pi-fw pi-bookmark'
      }

    ];
  }

}
