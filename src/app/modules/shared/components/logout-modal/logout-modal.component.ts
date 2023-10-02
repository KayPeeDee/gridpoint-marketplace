import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit() {}

  clearStorage(){
    for (const [key, value] of Object.entries(localStorage)) {
      localStorage.removeItem(key);
    }
  }

  logout() {
    this.clearStorage();
    this.ref.close(true);
  }

  close(){
    this.ref.close(false);
  }

}
