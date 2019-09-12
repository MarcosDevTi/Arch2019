import { CustomerFormComponent } from './../../pages/customer/customer-form/customer-form.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<CustomerFormComponent> {

  canDeactivate(component: CustomerFormComponent) {
    if (component.customerForm.dirty) {
      return confirm('Are you sure you to continue? Any unsaved changed will be lost');
    }
    return true;
  }
}
