import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  formUpdate: FormGroup;
  isUpdate: boolean;

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

  toFormGroup() {
    const group: any = {};

    this.phoneList.forEach(phone => {
      group[phone.phoneNumber] = new FormControl('');
    });
    return new FormGroup(group);
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
    this.isUpdate = false;
    const newPhone = this.formUpdate.getRawValue()[phone.phoneNumber];
    this.appService.updatePersonPhone(phone, newPhone).subscribe(data => {
      this.phoneList = data.data.success;
      this.selectAllPhone();
      phone.isEditing = false;
    });
  }

  deletePhoneNumber(phone) {
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
      this.formUpdate = this.toFormGroup();
    })
  }
}
