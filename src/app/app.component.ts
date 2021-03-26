import { Component, OnInit } from '@angular/core';
import { PhoneModel } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  phoneList: PhoneModel[];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.selectAllPhone();
  }

  insertPhoneNumber() {
    this.appService.insertPersonPhone()
  }

  updatePhoneNumber() {
    this.appService.updatePersonPhone()
  }

  deletePhoneNumber() {
    this.appService.insertPersonPhone()
  }

  selectPhoneNumber() {
    this.appService.selectPersonPhone()
  }

  selectAllPhone() {
    this.appService.selectAllPersonPhone().subscribe(data => {
      console.log(data)
      this.phoneList = data.data.personObjects;
    })
  }
}
