import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhoneModel } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  phoneList: PhoneModel[] = [];
  displayFieldNewPhone: boolean = false;
  formSelect: FormGroup;
  formInsert: FormGroup;

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.startForm();
    this.selectAllPhone();
  }

  startForm() {
    this.formSelect = this.formBuilder.group({
      phoneNumber: ''
    });
    this.formInsert = this.formBuilder.group({
      nameId: '',
      phoneNumber: '',
      typeId: ''
    });
  }

  insertPhoneNumber() {
    const param = {
      BusinessEntityID: this.formInsert.get('nameId').value,
      PhoneNumber: this.formInsert.get('phoneNumber').value,
      PhoneNumberTypeID: this.formInsert.get('typeId').value
    };
    
    this.appService.insertPersonPhone(param).subscribe(data => {
      this.phoneList = data;
      this.selectAllPhone();
    });
  }

  updatePhoneNumber(phone) {
    console.log(phone)
    this.appService.updatePersonPhone(phone).subscribe(data => {
      this.phoneList = data.data.success;
      this.selectAllPhone();
    });
  }

  deletePhoneNumber(phone) {
    console.log(phone)
    this.appService.deletePersonPhone(phone).subscribe(data => {
      this.phoneList = data.data.success;
      this.selectAllPhone();
    })
  }

  selectPhoneNumber() {
    const phoneNumber = this.formSelect.get('phoneNumber').value;
    if (phoneNumber) {
      this.appService.selectPersonPhone({ phoneNumber: phoneNumber }).subscribe(data => {
        this.phoneList = data.data.personObjects;
      });
    } else {
      this.selectAllPhone();
    }
  }

  selectAllPhone() {
    this.appService.selectAllPersonPhone().subscribe(data => {
      this.phoneList = data.data.personObjects;
    })
  }
}
