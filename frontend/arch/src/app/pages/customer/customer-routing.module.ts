import { CanDeactivateGuard } from './../../shared/_guards/can-deactivate-guard';
import { PreventUnsavedChanges } from './../../shared/_guards/prevent-unsaved-changes.guard';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: 'new', component: CustomerFormComponent, canDeactivate: [PreventUnsavedChanges]},
  {path: ':id/edit', component: CustomerFormComponent, canDeactivate: [PreventUnsavedChanges]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
