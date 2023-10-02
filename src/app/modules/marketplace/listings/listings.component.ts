import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit{

  listings: any[]=[];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listings = this.getListings();
  }

  getListings(){
    return [
      {
        title: 'Property Title One',
        price: 400000,
        image: 'popular-places-1.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Two',
        price: 500000,
        image: 'popular-places-2.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Popular Places Three',
        price: 600000,
        image: 'popular-places-3.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Four',
        price: 700000,
        image: 'properties-1.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Five',
        price: 800000,
        image: 'properties-2.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Six',
        price: 900000,
        image: 'properties-3.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Seven',
        price: 1000000,
        image: 'properties-4.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Eight',
        price: 1100000,
        image: 'properties-5.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Nine',
        price: 1200000,
        image: 'properties-6.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Ten',
        price: 1300000,
        image: 'properties-list-1.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Eleven',
        price: 1400000,
        image: 'properties-list-2.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Twelve',
        price: 1500000,
        image: 'properties-list-3.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Thirteen',
        price: 1600000,
        image: 'properties-list-4.jpg',
        currency: 'USD'
      },
      {
        title: 'Property Title Fourteen',
        price: 1700000,
        image: 'properties-list-5.jpg',
        currency: 'USD'
      },
    ]
  }

  getImageSrc(listing: any){
    return `assets/images/listings/${listing.image}`
  }

  viewDetailsPage(listing: any){
    this.router.navigate(['/marketplace/listings/single'])
  }

}
