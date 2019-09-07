import { CustomerItem } from './customer-item';
import { ParamsSearch } from './../../../shared/paramsSearch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private string
  getCustomers(): Observable<CustomerItem> {
    return this.http.get<CustomerItem>('http://localhost:50058/api/customer');
  }
  getCustomersWithParams(params: ParamsSearch): Observable<CustomerItem> {
    return this.http.get<CustomerItem>(
      `http://localhost:50058/api/customer?${params.property}=${params.inputParam}&TypeCompare_${params.property}=${params.typeCompare}`);
  }

  getCustomersWithParamsCollection(params: ParamsSearch[]): Observable<CustomerItem> {
    return this.http.get<CustomerItem>(this.buildQueryString(params));
  }

  buildQueryString(params: ParamsSearch[]) {
    let url = 'http://localhost:50058/api/customer?';

    params.forEach(_ => {
      url += `${_.property}=${_.inputParam}&TypeCompare_${_.property}=${_.typeCompare}&`;
    });
    console.log('url', url.slice(0, -1));
    return url.slice(0, -1);
  }
}
