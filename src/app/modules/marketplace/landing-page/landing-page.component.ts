import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {propertyTypes} from "../../shared/models/params";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  propertyTypesList: any[] = [];
  selectedPropertyTypes: any[]=[];


  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPropertyParameters();
  }

  search(){
    this.router.navigate(['/marketplace/listings']);
  }

  getPropertyParameters(){
    this.propertyTypesList = propertyTypes;
  }

  onMultiSelect($event: any, type: string){}

}
