import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { countryCodes } from 'src/app/_helpers/models/countries';
import {PropertiesApiService} from "../../../../../services/properties-api.service";
import {Modal, Toast} from "../../../../shared/helpers/swal-toasts";
import {BehaviorSubject} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-property-owner',
  templateUrl: './create-property-owner.component.html',
  styleUrls: ['./create-property-owner.component.scss']
})
export class CreatePropertyOwnerComponent implements OnInit{

  ownershipFrom!: FormGroup;
  countryCodes: any[] = [];
  selectedCountryCode!: any;
  filteredCountryCodes: any[] = [];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  datepipe: DatePipe = new DatePipe('en-US');
  minDate!: Date;
  memberTypes: any[] = ['Trustee', 'Settlor', 'Protector', 'Beneficiary'];


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private propertiesApiService: PropertiesApiService
  ) {
    this.minDate = new Date();
    let today = new Date();
    this.minDate.setDate(today.getDate());
  }

  ngOnInit(): void {
    this.initForm();
    this.countryCodes = countryCodes.map(code => code.dial_code);
  }

  initForm(){
    this.ownershipFrom = this.formBuilder.group({
      individuals: this.formBuilder.group({
        first_name: [''],
        middle_name: [''],
        last_name: [''],
        email: [''],
        country_code: [''],
        phone_number: [''],
        date_of_birth: [''],
        id_passport_number: [''],
        user_id: [null],
        property_id: [null],
        share_percentage: [null],

        country: [''],
        state_province: [''],
        town_city: [''],
        district_county: [''],
        area: [''],
        suburb: [''],
        street_road_name: [''],
        street_road_number: [''],
        building_complex_name: [''],
        unit_number: [''],

      }),
      companies: this.formBuilder.group({
        name: [''],
        email: [''],
        country_code: [''],
        phone_number: [''],
        reg_number: [''],
        user_id: [],
        property_id: [],
        share_percentage: [],

        country: [''],
        state_province: [''],
        town_city: [''],
        district_county: [''],
        area: [''],
        suburb: [''],
        street_road_name: [''],
        street_road_number: [''],
        building_complex_name: [''],
        unit_number: [''],

        shareholders: this.formBuilder.array([this.newCompanyShareholder()])
      })
    })
  }

  checkSharePercentage($event: any){}

  filterCountryCodes(event: any) {
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.countryCodes.length; i++) {
      let country = this.countryCodes[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountryCodes = filtered;
  }

  get companyShareholders(): FormArray {
    return this.ownershipFrom.controls["companies"].get("shareholders") as FormArray;
  }

  addCompanyShareholders() {
    this.companyShareholders.push(this.newCompanyShareholder());
  }

  newCompanyShareholder(): FormGroup {
    return this.formBuilder.group({
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      email: [''],
      country_code: [''],
      phone_number: [null],
      dob: [''],
      id_passport: [''],
      share_percentage: [],
      date_of_birth: [null],
      id_passport_number: [''],
      shareholder_type: [''],
      company_name: [''],
      company_reg_number: ['']
    });
  }

  removeCompanyShareholder(i:number) {
    this.companyShareholders.removeAt(i);
  }

  onSelectShareholderDob($event: any, i: number){
    console.log($event);
    this.companyShareholders.at(i).patchValue({
      date_of_birth: this.datepipe.transform($event, 'YYYY-MM-dd')
    })
  }

  save(){
    const requestData = {
      data: null,
      ownershipType: '',
      successMessage: ''
    };
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : null;
    const userId = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')).id : null;
    switch (this.config.data.ownershipType) {
      case 'Individual(s)':
        const individualFormData = this.ownershipFrom.value.individuals;
        individualFormData['property_id'] = propertyId;
        individualFormData['user_id'] = userId;
        individualFormData['date_of_birth'] = this.datepipe.transform(this.ownershipFrom.value.individuals.date_of_birth, 'YYYY-MM-dd');
        requestData['data'] = individualFormData;
        requestData['ownershipType'] = 'individual';
        requestData['successMessage'] = 'Individual Property Owner added successfully';
        break;
      case 'Compan(ies)':
        console.log(this.ownershipFrom.value)
        const companyFormData = this.ownershipFrom.value.companies;
        companyFormData['property_id'] = propertyId;
        companyFormData['user_id'] = userId;
        requestData['data'] = companyFormData;
        requestData['ownershipType'] = 'company';
        requestData['successMessage'] = 'Company Property Owner added successfully';
        break;
      case 'Trust(s)':
        const trustFormData = this.ownershipFrom.value.companies;
        trustFormData['property_id'] = propertyId;
        trustFormData['user_id'] = userId;
        requestData['data'] = trustFormData;
        requestData['ownershipType'] = 'trust';
        requestData['successMessage'] = 'Trust Property Owner added successfully';
        break;
    }
    console.log(requestData)

    this.propertiesApiService.createPropertyOwners(requestData.data, requestData.ownershipType).subscribe({
      next: (res: any) => {
        console.log(res)
        this.loading$.next(false);
        this.ref.close(true);
        Toast.fire('Done', `${requestData.successMessage}`, 'success')
      },
      error: (err: any) => {
        console.log(err);
        this.loading$.next(false);
        Modal.fire('Error', `${err.message}`, 'error');
      },
      complete: () => {
        this.loading$.next(false);
      }
    })

  }

  close(){
    this.ref.close(false);
  }



}
