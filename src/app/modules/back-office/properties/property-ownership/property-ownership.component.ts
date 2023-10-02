import {Component, Input, OnInit} from '@angular/core';
import {propertyOwnershipTypes} from "../../../shared/models/params";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {CreatePropertyOwnerComponent} from "./create-property-owner/create-property-owner.component";
import {MessageService} from "primeng/api";
import {PropertiesApiService} from "../../../../services/properties-api.service";
import {Toast} from "../../../shared/helpers/swal-toasts";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'property-ownership',
  templateUrl: './property-ownership.component.html',
  styleUrls: ['./property-ownership.component.scss']
})
export class PropertyOwnershipComponent implements OnInit{

  propertyOwnershipTypesOptions: any[]=[];
  selectedPropertyOwnershipTypes: any[]=[];
  ref!: DynamicDialogRef;
  @Input() propertyId!: any;
  individualPropertyOwners$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  companyPropertyOwners$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  trustPropertyOwners$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private propertiesApiService: PropertiesApiService
  ) {}

  ngOnInit(): void {
    this.propertyOwnershipTypesOptions = propertyOwnershipTypes;
    this.getPropertyOwnership();
  }

  filterByShareholderType(type: string){
    return this.selectedPropertyOwnershipTypes.some((el: any) => el.type_name === type);
  }

  getPropertyOwnership(){
    const params = {};
    const propertyId = localStorage.getItem('property_id') ? JSON.parse(localStorage.getItem('property_id')!) : this.propertyId;
    this.propertiesApiService.getPropertiesOwnership(propertyId, params).subscribe({
      next: (res: any) => {
        console.log(res)

        const individuals = [];
        const companies = [];
        const trusts = [];
        for (let i = 0; i < res.length; i++) {
          const owner = res[i];
          switch (owner.ownership_type) {
            case 'Individual(s)':
              individuals.push(owner);
              break;
            case 'Compan(ies)':
              companies.push(owner);
              break;
            case 'Trust(s)':
              trusts.push(owner);
              break;
          }
        }

        if (individuals.length > 0) {
          this.individualPropertyOwners$.next([...individuals]);
          if (!this.selectedPropertyOwnershipTypes.some(selectedPropertyOwnershipType => selectedPropertyOwnershipType.type_name === 'Individual(s)')) {
            this.selectedPropertyOwnershipTypes.push({type_name: 'Individual(s)'})
          }
        }

        if (companies.length > 0) {
          this.companyPropertyOwners$.next([...companies]);
          if (!this.selectedPropertyOwnershipTypes.some(selectedPropertyOwnershipType => selectedPropertyOwnershipType.type_name === 'Compan(ies)')) {
            this.selectedPropertyOwnershipTypes.push({type_name: 'Compan(ies)'})
          }
        }
        if (trusts.length > 0) {
          this.trustPropertyOwners$.next([...trusts]);
          if (!this.selectedPropertyOwnershipTypes.some(selectedPropertyOwnershipType => selectedPropertyOwnershipType.type_name === 'Trust(s)')) {
            this.selectedPropertyOwnershipTypes.push({type_name: 'Trust(s)'})
          }
        }

      },
      error: (err: any) => {},
      complete: () => {}
    })
  }

  refresh(){
    this.getPropertyOwnership();
  }

  addShareholder(type: string){}

  openCreateOwnerModal(type: string) {
    this.ref = this.dialogService.open(CreatePropertyOwnerComponent, {
      header: 'Create Property Owner',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      styleClass: 'medium-modal',
      data: {
        ownershipType: type
      }
    });
    this.ref.onClose.subscribe((isCreated: boolean) => {
      if (isCreated) {
        this.messageService.add({ severity: 'info', summary: 'Property Ownership Created', detail: 'Successful' });
        this.refresh();
      }
    });
  }


}
