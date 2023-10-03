import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesApiService} from "../../../../services/properties-api.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {DatePipe} from "@angular/common";
import {
  additionalDeedTypes,
  areasOptions,
  currencies, periodOptions,
  propertyOwnershipTypes, propertyStatuses,
  propertyTypes,
  propertyZones
} from "../../../shared/models/params";
import { keyIsInArrayOfLocalStorageKeys } from 'src/app/modules/shared/helpers';
import {Toast} from "../../../shared/helpers/swal-toasts";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit, OnDestroy {

  sizeOptions: any[] = [ 'Square Feet', 'Square Metres', 'Acres', 'Hectares' ];
  propertyForm!: FormGroup;
  addressForm!: FormGroup;
  deedsForm!: FormGroup;
  financialsForm!: FormGroup;
  propertyTypesForm!: FormGroup;
  marketingForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  datepipe: DatePipe = new DatePipe('en-US');
  additionalDeedTypes: any[]=[];
  propertyTypesOptions: any[]=[];
  selectedPropertyTypes: any[]=[];
  propertyZonesOptions: any[]=[];
  selectedZones: any[]=[];
  index: number = 0;
  propertyOwnershipTypesOptions: any[]=[];
  selectedPropertyOwnershipTypes: any[]=[];
  propertyId$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currencies: any[]=[];
  areasOptions: any=[];
  minDate!: Date;
  periodOptions: any[]=[];
  propertyStatusesOptions: any[]=[];
  selectedPropertyStatuses: any[]=[];

  addedPropertyListingStatuses: any[]=[];


  constructor(
    private propertiesApiService: PropertiesApiService,
    private formBuilder: FormBuilder
  ) {
    this.minDate = new Date();
    let today = new Date();
    this.minDate.setDate(today.getDate());
  }


  ngOnInit(): void {
    this.initForm();
    this.additionalDeedTypes = additionalDeedTypes.map(deeType => deeType.name);
    this.propertyTypesOptions = propertyTypes;
    this.propertyZonesOptions = propertyZones;
    this.propertyOwnershipTypesOptions = propertyOwnershipTypes;
    this.currencies = currencies.map(item => item.currency);
    this.areasOptions = areasOptions.map(item => item.option);
    this.periodOptions = periodOptions.map(item => item.option);
    this.propertyStatusesOptions = propertyStatuses;
  }

  handleTabChange(e: any) {
    let index = e.index;
  }

  openNext() {
    this.index =  this.index + 1;
  }

  openPrev() {
    this.index = this.index - 1;
  }

  initForm(){

    this.propertyForm = this.formBuilder.group({
      parcel_number: [''],
      parent: [null],
      property_ref_code: [''],
      year_built: [null],
      remodeled_year: [null],
      lot_size: [null],
      lot_size_postfix: [''],
      foot_print_size: [null],
      foot_print_size_postfix: [''],
      floor_size: [null],
      floor_size_postfix: [''],
      user_id: [null]
    });

    this.addressForm = this.formBuilder.group({
      property: [null],
      unit_number: [''],
      building_complex_name: [''],
      road_street_number: [''],
      road_street_name: [''],
      suburb: [''],
      area: [''],
      district_county: [''],
      city_town: [''],
      province: [''],
      country: [''],
      latitude: [''],
      longitude: [''],
      created_by: [null],
      updated_by: [null],
    });

    this.deedsForm = this.formBuilder.group({
      deeds: this.formBuilder.array([this.newDeed()]),
    });

    this.propertyTypesForm = this.formBuilder.group({

    });

    this.financialsForm = this.formBuilder.group({
      property_valuation_pricing: this.formBuilder.group({
        property: [''],
        sales_valuation_price: [null],
        sales_valuation_price_currency: [''],
        sales_valuation_price_option: [''],
        rental_valuation_price: [],
        rental_valuation_price_currency: [''],
        rental_valuation_price_option: [''],
        rental_valuation_pricing_period: [''],
        valuation_date: [''],
        created_by: [''],
        updated_by: ['']
      }),
      property_market_appraisal_price: this.formBuilder.group({
        property: [''],
        sales_market_appraisal_price: [],
        sales_market_appraisal_price_currency: [''],
        sales_market_appraisal_price_option: [''],
        rental_market_appraisal_price: [],
        rental_market_appraisal_price_currency: [''],
        rental_market_appraisal_price_option: [''],
        rental_market_appraisal_pricing_period: [''],
        valuation_date: [''],
        appraiser_name: [''],
        appraisal_notes: [''],
        created_by: [''],
        updated_by: [''],
      })
    });

    this.marketingForm = this.formBuilder.group({
      property_id: [],
      property_listing_title: [''],
      property_listing_teaser: [''],
      property_listing_description: [''],
      property_listings: this.formBuilder.array([])
    })
  }

  get propertyDeeds(): FormArray {
    return this.deedsForm.get("deeds") as FormArray;
  }

  newDeed(): FormGroup {
    return this.formBuilder.group({
      property_id: null,
      parent: null,
      deed_type: [''],
      deed_date: [''],
      deed_number: [''],
      user_id: null
    })
  }

  addDeeds() {
    this.propertyDeeds.push(this.newDeed());
  }

  removeDeed(i:number) {
    this.propertyDeeds.removeAt(i);
  }

  get propertyListings(): FormArray {
    return this.marketingForm.get("property_listings") as FormArray;
  }

  newListing(statusName: string): FormGroup {
    return this.formBuilder.group({
      property_id: null,
      property_listing_title: '',
      property_listing_teaser: [''],
      property_listing_description: [''],
      property_listing_status: [statusName]
    })
  }

  onCheckPropertyListingStatus($event: any){
    console.log($event);
    const selectedItems = $event.value;
    if (this.addedPropertyListingStatuses.length === 0) {
      this.addedPropertyListingStatuses = selectedItems;
      this.addPropertyListings(selectedItems, this.propertyListings);
    } else {
      if (selectedItems.length >= this.addedPropertyListingStatuses.length) {
        for (let i = 0; i < selectedItems.length; i++) {
          if (!this.addedPropertyListingStatuses.includes(selectedItems[i])) {
            this.propertyListings.push(this.newListing(selectedItems[i].status_name));
          }
        }
        this.addedPropertyListingStatuses = selectedItems;
      } else {
        for (let i = 0; i < this.addedPropertyListingStatuses.length; i++) {
          if (!selectedItems.includes(this.addedPropertyListingStatuses[i])) {
            this.removePropertyListing(this.propertyListings, this.addedPropertyListingStatuses[i].status_name);
          }
        }
        this.addedPropertyListingStatuses = selectedItems;
      }
    }
  }

  addPropertyListings(items: any[], listingsFormArray: FormArray) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      listingsFormArray.push(this.newListing(element.status_name));
    }
  }

  removePropertyListing(listingsFormArray: FormArray, statusName: string){
    listingsFormArray.removeAt(listingsFormArray.value.findIndex((listing: any) => listing.status_name === statusName));
  }


  filterByShareholderType(type: string){
    return this.selectedPropertyOwnershipTypes.some((el: any) => el.type === type);
  }

  onCreateProperty(){
    this.loading$.next(true);
    const requestData = this.propertyForm.value;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    if (requestData['year_built']) {
      const _yearBuilt = this.datepipe.transform(requestData['year_built'], 'YYYY');
      if (typeof _yearBuilt === "string") {
        requestData['year_built'] = JSON.parse(_yearBuilt)!;
      }
    }

    if (requestData['remodeled_year']) {
      const _remodeledYear = this.datepipe.transform(requestData['remodeled_year'], 'YYYY');
      if (typeof _remodeledYear === "string") {
        requestData['remodeled_year'] = JSON.parse(_remodeledYear)!;
      }
    }

    requestData['user_id'] = userId;

    console.log(requestData)
    this.propertiesApiService.createProperty(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        localStorage.setItem('property_id', res.data.id);
        localStorage.setItem('parcel_number', res.data.parcel_number);
        this.loading$.next(false);
        Toast.fire('Done', 'Main Property Details added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }
    })

  }

  onCreatePropertyLocation(){
    this.loading$.next(true);
    const requestData = this.addressForm.value;
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    requestData['property'] = propertyId;
    requestData['created_by'] = userId;
    requestData['updated_by'] = userId;
    console.log(requestData);
    this.propertiesApiService.createPropertyLocation(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        Toast.fire('Done', 'Property Location added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }
    })
  }

  onCreatePropertyDeeds(){
    this.loading$.next(true);
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    const propertyDeeds = [];
    for (let i = 0; i < this.deedsForm.value.deeds.length; i++) {
      const deed = this.deedsForm.value.deeds[i];
      deed['deed_date'] = this.datepipe.transform(deed['deed_date'], 'YYYY-MM-dd');
      deed['property_id'] = propertyId;
      deed['user_id'] = userId;
      propertyDeeds.push(deed);
    }
    console.log(propertyDeeds);
    this.propertiesApiService.createPropertyDeeds({ deeds: propertyDeeds }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        Toast.fire('Done', 'Property Deeds added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }
    })
  }

  onCreatePropertyAdditionalInfo(){
    this.loading$.next(true);
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    const property_types = this.selectedPropertyTypes;
    const property_zones = this.selectedZones;
    const property_rooms: any[] = [];

    const requestData = {
      user_id: userId,
      property_id: propertyId,
      property_zones: property_zones,
      property_types: property_types,
      property_rooms: property_rooms
    }
    console.log(requestData);
    this.propertiesApiService.createAdditionalPropertyInfo(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        Toast.fire('Done', 'Additional Property Info added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }
    })
  }

  onCreatePropertyFinancialInfo(){
    this.loading$.next(true);
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    const requestData = {
      user_id: userId,
      property_id: propertyId,
      property_valuation_pricing: this.financialsForm.value.property_valuation_pricing,
      property_market_appraisal_price: this.financialsForm.value.property_market_appraisal_price
    }
    requestData['property_valuation_pricing']['valuation_date'] = this.datepipe.transform(this.financialsForm.value.property_valuation_pricing.valuation_date, 'YYYY-MM-dd');
    requestData['property_market_appraisal_price']['valuation_date'] = this.datepipe.transform(this.financialsForm.value.property_market_appraisal_price.valuation_date, 'YYYY-MM-dd')

    console.log(requestData)
    this.propertiesApiService.createPropertyFinancialInfo(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        Toast.fire('Done', 'Additional Property Info added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }
    })
  }

  onCreatePropertyListingMarketingInfo(){
    this.loading$.next(true);
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    const requestData = this.marketingForm.value;
    requestData['property'] = propertyId;
    requestData['created_by'] = userId;
    requestData['updated_by'] = userId;
    console.log(requestData);
    this.propertiesApiService.createPropertyMarketingInfo(requestData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        Toast.fire('Done', 'Property Marketing Info added successfully', 'success')
      },
      error: (err: any) => {
        this.loading$.next(false);
      },
      complete: () => {
        this.loading$.next(false);
        this.openNext();
      }

    });
  }


  clearStorage(){
    for (const [key, value] of Object.entries(localStorage)) {
      if (!keyIsInArrayOfLocalStorageKeys(key)) localStorage.removeItem(key);
    }
  }

  ngOnDestroy(): void {
    this.clearStorage();
  }


}
