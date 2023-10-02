import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{

  items: MenuItem[] = [];
  @Output() isCloseEvent$ = new EventEmitter();

  ngOnInit(): void {
    this.items = this.getMyMenuItems();
  }

  getMyMenuItems() {
    return [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-palette',
        routerLink:"/gd-admin/dashboard",
        routerLinkActive:"active",
        command: () => {
          this.isCloseEvent$.emit(true);
        }
      },
      {
        label: 'Properties',
        icon: 'pi pi-fw pi-home',
        items: [
          {
            label: 'Add Property',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/gd-admin/properties/add-property',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'My Properties',
            icon: 'pi pi-fw pi-list',
            routerLink: '/gd-admin/properties/list/my-properties',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'Agency Properties',
            icon: 'pi pi-fw pi-list',
            routerLink: '/gd-admin/properties/list/my-properties',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'Public Properties',
            icon: 'pi pi-fw pi-list',
            routerLink: '/gd-admin/properties/list/my-properties',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          }
        ]
      },
      {
        label: 'Ad Listings',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Create Listing',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/ads/create-ad',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'My Listings',
            icon: 'pi pi-fw pi-list',
            routerLink: '/ads/my-ads',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'Company Listings',
            icon: 'pi pi-fw pi-list',
            routerLink: '/ads/company-ads',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          },
          {
            label: 'All Listings',
            icon: 'pi pi-fw pi-list',
            routerLink: '/ads/all-ads',
            routerLinkActive:"active",
            command: () => {
              this.isCloseEvent$.emit(true);
            }
          }
        ]
      },
      {
        label: 'Profiles',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'My Personal Profile',
            icon: 'pi pi-fw pi-user',
            // routerLink: '/profile/my-profile',
            // routerLinkActive:"active",
            // command: () => {
            //   this.isCloseEvent$.emit(true);
            // }
          },
          {
            label: 'My Business Profile',
            icon: 'pi pi-fw pi-user',
            // routerLink: '/profile/my-profile',
            // routerLinkActive:"active",
            // command: () => {
            //   this.isCloseEvent$.emit(true);
            // }
          },
          // {
          //   label: 'My Business',
          //   icon: 'pi pi-fw pi-users',
          //   items: [
          //     {
          //       label: 'Quick Overview',
          //       icon: 'pi pi-fw pi-minus',
          //       routerLink: '/profile/business-profile',
          //       routerLinkActive: "active",
          //       command: () => {
          //         this.isCloseEvent$.emit(true);
          //       }
          //     },
          //     {
          //       label: 'Details',
          //       icon: 'pi pi-fw pi-minus',
          //       routerLink: '/profile/business-details',
          //       routerLinkActive: "active",
          //       command: () => {
          //         this.isCloseEvent$.emit(true);
          //       }
          //     },
          //     {
          //       label: 'Branches',
          //       icon: 'pi pi-fw pi-minus',
          //       routerLink: '/profile/business-branches',
          //       routerLinkActive: "active",
          //       command: () => {
          //         this.isCloseEvent$.emit(true);
          //       }
          //     },
          //     {
          //       label: 'Membership',
          //       icon: 'pi pi-fw pi-minus',
          //       routerLink: '/profile/business-users',
          //       routerLinkActive: "active",
          //       command: () => {
          //         this.isCloseEvent$.emit(true);
          //       }
          //     },
          //     {
          //       label: 'Contact Details',
          //       icon: 'pi pi-fw pi-minus',
          //       routerLink: '/profile/business-contacts',
          //       routerLinkActive: "active",
          //       command: () => {
          //         this.isCloseEvent$.emit(true);
          //       }
          //     },
          //   ]
          // }
        ]
      },
      // {
      //   label: 'Users',
      //   icon: 'pi pi-fw pi-user',
      //   items: [
      //     {
      //       label: 'New',
      //       icon: 'pi pi-fw pi-user-plus'
      //     },
      //     {
      //       label: 'Delete',
      //       icon: 'pi pi-fw pi-user-minus'
      //     },
      //     {
      //       label: 'Search',
      //       icon: 'pi pi-fw pi-users',
      //       items: [
      //         {
      //           label: 'Filter',
      //           icon: 'pi pi-fw pi-filter',
      //           items: [
      //             {
      //               label: 'Print',
      //               icon: 'pi pi-fw pi-print'
      //             }
      //           ]
      //         },
      //         {
      //           icon: 'pi pi-fw pi-bars',
      //           label: 'List'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   label: 'Events',
      //   icon: 'pi pi-fw pi-calendar',
      //   items: [
      //     {
      //       label: 'Edit',
      //       icon: 'pi pi-fw pi-pencil',
      //       items: [
      //         {
      //           label: 'Save',
      //           icon: 'pi pi-fw pi-calendar-plus'
      //         },
      //         {
      //           label: 'Delete',
      //           icon: 'pi pi-fw pi-calendar-minus'
      //         }
      //       ]
      //     },
      //     {
      //       label: 'Archieve',
      //       icon: 'pi pi-fw pi-calendar-times',
      //       items: [
      //         {
      //           label: 'Remove',
      //           icon: 'pi pi-fw pi-calendar-minus'
      //         }
      //       ]
      //     }
      //   ]
      // }
      {
        label: 'Bookmarks',
        icon: 'pi pi-fw pi-bookmark',
        // routerLink: '/gd-admin/properties/list/my-properties',
        // routerLinkActive:"active",
        // command: () => {
        //   this.isCloseEvent$.emit(true);
        // }
      },
    ];
  }


}
