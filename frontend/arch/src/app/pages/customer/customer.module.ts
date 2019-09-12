import { PreventUnsavedChanges } from './../../shared/_guards/prevent-unsaved-changes.guard';
import { ParamsGridDataRangeComponent } from './../../shared/components/params-grid-data-range/params-grid-data-range.component';
import { AutoFocusDirective } from './../../shared/directives/auto-focus.directive';
import { ParamsGridComplexComponent } from './../../shared/components/params-grid-complex/params-grid-complex.component';
import { ConfirmationDialog } from 'src/app/shared/dialogs/confirmation-dialog';
import { ParamsGridComponent } from './../../shared/components/params-grid/params-grid.component';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    ParamsGridComponent,
    ParamsGridComplexComponent,
    ParamsGridDataRangeComponent,
    ConfirmationDialog,
    AutoFocusDirective],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    TranslateModule
  ],
  entryComponents: [
    ConfirmationDialog,
    ParamsGridComplexComponent
  ],
  providers: [
    PreventUnsavedChanges
  ]
})
export class CustomerModule { }
