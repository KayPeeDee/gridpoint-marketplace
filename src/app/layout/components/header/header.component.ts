import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LogoutModalComponent} from "../../../modules/shared/components/logout-modal/logout-modal.component";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {AuthApiService} from "../../../services/auth-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  items: MenuItem[]=[];
  activeItem!: MenuItem;
  user!: any;
  user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ref!: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private authApiService: AuthApiService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(<string>localStorage.getItem('user'));
      this.user$.next(JSON.parse(<string>localStorage.getItem('user')));
    }

    this.authApiService.isAuthenticated$.subscribe(res => {
      console.log(res);
    })

  }

  openLogoutModal() {
    this.ref = this.dialogService.open(LogoutModalComponent, {
      header: 'Logout',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      styleClass: 'small-modal'
    });
    this.ref.onClose.subscribe((isLoggedOut: boolean) => {
      if (isLoggedOut) {
        this.user = null;
        this.user$.next(null)
        this.router.navigate(['/auth/login'])
      }
    });
  }

  openDashboard(){
    this.router.navigate(['/gd-admin/dashboard'])
  }


}
