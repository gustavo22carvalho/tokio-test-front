import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  env = environment;
  API_URL: string;
  API_CUSTOMERS = '/customers';

  constructor(private http: HttpClient) {
    this.API_URL = this.env.urlApi;
  }

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

  saveCustomer(customer: Customer): any {
    return this.http.post(this.API_URL + this.API_CUSTOMERS, { customer });
  }

  findCep(cep: String): any {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

}
