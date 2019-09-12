import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  customerForm: FormGroup;
  unloadNotification($event: any) {
    if (this.customerForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildCustomerForm();
  }



  buildCustomerForm() {
    this.customerForm = this.fb.group({
      id: [null],
      firstName: [null],
      lastName: [null],
      email: [null],
    });
  }

  submitForm() {
    console.log(this.customerForm.value);
  }
}
