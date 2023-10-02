import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PropertiesApiService} from "../../../../services/properties-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-my-properties',
  templateUrl: './list-my-properties.component.html',
  styleUrls: ['./list-my-properties.component.scss']
})
export class ListMyPropertiesComponent implements OnInit{

  properties$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private propertiesApiService: PropertiesApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyProperties();
  }

  getMyProperties(){
    const user = JSON.parse(<string>localStorage.getItem('user'));
    const params = {}
    this.propertiesApiService.getPropertiesByUser(params).subscribe({
      next: (res: any) => {
        console.log(res)
        this.isLoading$.next(false);
        this.properties$.next([...res.results]);
      },
      error: (err: any) => {
        this.isLoading$.next(false);
      },
      complete: () => {
        this.isLoading$.next(false);
      }
    })
  }

  createNewProperty(){
    this.router.navigate(['/gd-admin/properties/add-property'])
  }

}
