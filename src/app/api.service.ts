import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable()
export class ApiService {

  // API_URL = 'http://localhost:8080';
  API_URL = 'http://18.218.137.200:8080';
  API_CUSTOMERS = '/customers';

  constructor(private http: HttpClient) { }

  findCustomers(page: number, size: number): any {

    return this.http
      .get(this.API_URL + this.API_CUSTOMERS, {
        params: new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
      }).pipe(
        map(res => res)
      );
  }

  save(customer: Customer): any {
    this.http.post(this.API_URL + this.API_CUSTOMERS, {

    });
  }

}
