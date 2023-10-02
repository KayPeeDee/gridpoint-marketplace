import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthApiService} from "../../../services/auth-api.service";
import {Modal} from "../../shared/helpers/swal-toasts";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  signup(){
    this.router.navigate(['/auth/register']);
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  login(){
    this.loading$.next(true);
    const requestData = this.loginForm.value;
    // this.authApiService.loginAndGetAccessToken(requestData).subscribe(res => {
    //   console.log(res);
    // })
    this.authApiService.loginAndGetAccessToken(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        localStorage.setItem('tokens', JSON.stringify(res));
      },
      error: (error: any) => {
        console.log(error)
        this.loading$.next(false);
        Modal.fire(`${error.statusText}`, `${error.error.detail}`, 'error');
      },
      complete: () => {
        this.loading$.next(false);
        this.getAuthUser();
      }
    })
  }

  getAuthUser(){
    this.authApiService.getAuthUser({}).subscribe({
      next: (res: any) => {
        console.log(res)
        localStorage.setItem('user', JSON.stringify(res));
        this.authApiService.isAuthenticated$.next(true);
      },
      error: (error: any) => {
        console.log(error)
        Modal.fire(`${error.statusText}`, `${error.error.detail}`, 'error');
      },
      complete: () => {
        this.router.navigate(['/gd-admin/dashboard']);
      }
    })
  }

}
