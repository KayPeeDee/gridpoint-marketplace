import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { MultiSelectModule } from 'primeng/multiselect';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from "primeng/api";
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import {InputTextareaModule} from "primeng/inputtextarea";
import { PanelMenuModule } from 'primeng/panelmenu';


@NgModule({
  declarations: [
    LogoutModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    TabViewModule,
    DividerModule,
    MultiSelectModule,
    DynamicDialogModule,
    MenubarModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    AutoCompleteModule,
    ToastModule,
    InputTextareaModule,
    PanelMenuModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ButtonModule,
    TabViewModule,
    DividerModule,
    MultiSelectModule,
    DynamicDialogModule,
    LogoutModalComponent,
    MenubarModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    AutoCompleteModule,
    ToastModule,
    InputTextareaModule,
    PanelMenuModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    DynamicDialogRef,
    DialogService,
    MessageService
  ]
})
export class SharedModule { }
