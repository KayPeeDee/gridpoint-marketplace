import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BehaviorSubject} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";
import {AuthApiService} from "../../services/auth-api.service";
import {LogoutModalComponent} from "../../modules/shared/components/logout-modal/logout-modal.component";

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit{

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
