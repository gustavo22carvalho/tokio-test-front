import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { environment } from '../../environments/environment';
import { Address } from '../model/address';

const API_CUSTOMERS = '/customers';
const API_ADDRESSES= '/addresses';

@Injectable()
export class ApiService {

  env = environment;
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.env.urlApi;
  }

  findCustomers(page: number, size: number): any {
    return this.http
      .get(this.API_URL + API_CUSTOMERS, {
        params: new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
      }).pipe(
        map(res => res)
      );
  }

  listAddressesByCustomer(id: number): any {
    return this.http.get(`${this.API_URL}${API_CUSTOMERS}/${id}${API_ADDRESSES}`);
  }

  saveCustomer(customer: Customer): any {
    return this.http.request( (!!customer.id ? 'PUT' : 'POST'), this.API_URL + API_CUSTOMERS, { body: customer });
  }

  saveAddresses(addresses: Address[]): any {
    return this.http.post(this.API_URL + API_ADDRESSES, { 'addresses': addresses } );
  }

  findCep(cep: String): any {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

}
