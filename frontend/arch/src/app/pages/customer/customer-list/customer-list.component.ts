import { ParamGrid } from './../../../shared/components/params-components/shared/param-grid.model';
import { TableParamsComplex } from './../../../shared/dialogs/table-params-complex';
import { ParamsSearch } from './../../../shared/paramsSearch';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialog } from 'src/app/shared/dialogs/confirmation-dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  paramsSearch: ParamsSearch[] = [];
  customers;
  displayedColumns = ['firstName', 'lastName', 'email', 'address', 'birth-date'];
  properties: ParamGrid[] = [
    {property: 'Street', head: 'Street'},
    {property: 'Number', head: 'Number'},
    {property: 'City', head: 'City'},
    {property: 'Country', head: 'Country'}
  ];

  search: string;
  equal: string;

  constructor(
    public translate: TranslateService,
    private customerService: CustomerService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers()
    .subscribe(_ => {
      this.customers = _;
    });
  }

  openDialog(top: string, left: string, event): void {
    console.log(event);
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {search: this.search, equal: this.equal},
      position: {top, left}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search = result;
    });
  }

  setParams() {

  }

  addParamSearch(...events: ParamsSearch[] ) {
    events.forEach(event => this.addParamSearchDistinct(event));
    this.loadList();
  }

  addParamsSearch(events: ParamsSearch[] ) {
    events.forEach(_ =>  this.addParamSearchDistinct(_));
    this.loadList();
  }

  loadList() {
    this.customerService.getCustomersWithParamsCollection(this.paramsSearch).subscribe(_ => {
      this.customers = _;
    });
  }

  addParamSearchDistinct(params: ParamsSearch) {
    const resultIndex = this.paramsSearch.findIndex(_ => _.property === params.property);
    if (params.inputParam === '' || params.inputParam === null) {
      this.clear(params.property);
    } else if (resultIndex !== -1) {
      this.paramsSearch[resultIndex].inputParam = params.inputParam;
      this.paramsSearch[resultIndex].typeCompare = params.typeCompare;
    } else {
      this.paramsSearch.push(params);
    }
  }

  clear(event) {
    const resultIndex = this.paramsSearch.findIndex(_ => _.property === event);
    if (resultIndex !== -1) {
      this.paramsSearch.splice(resultIndex, 1);
    }

    this.loadList();
  }
}
