import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "../../../services/auth-api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Modal} from "../../shared/helpers/swal-toasts";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  roles: any[]=[];
  selectedRoles!: any[];

  registerForm!: FormGroup;
  accountTypes: any[]=[];
  countryCodes: any[] =[];
  selectedCountryCode!: any;
  filteredCountryCodes: any[] = [];
  loginUrl!: string;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // this.roles = [
    //   {name: 'New York', code: 'NY'},
    //   {name: 'Rome', code: 'RM'},
    //   {name: 'London', code: 'LDN'},
    //   {name: 'Istanbul', code: 'IST'},
    //   {name: 'Paris', code: 'PRS'}
    // ];
    this.getUserGroups();
    this.initForm();
  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }

  getUserGroups(){
    const params = {};
    this.authApiService.getGroups(params).subscribe(res => {
      console.log(res);
      this.roles = res.results;
    })
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      user_name: [''],
      password: [''],
      password_confirmation: [''],
      groups: [''],
      user_permissions: ['']
    })
  }

  signup(){
    this.loading$.next(true);
    const requestData = this.registerForm.value;
    requestData['groups'] = this.selectedRoles.map((role: any) => role.id);
    requestData['user_permissions'] = [];
    this.loading$.next(true);
    this.authApiService.createUserAccount(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (error: any) => {
        console.log(error)
        Modal.fire(`${error.statusText}`, `${error.error.detail}`, 'error');
      },
      complete: () => {
        this.login(requestData['email'], requestData['password']);
      }
    });
  }

  login(email: string, password: string){
    const requestData = { email, password };
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
