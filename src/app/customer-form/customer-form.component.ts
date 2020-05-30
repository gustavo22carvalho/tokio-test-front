import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      adresses: this.fb.array([this.createAddressItem()])
    });
  }

  get adresses() {
    return this.customerForm.get('adresses') as FormArray;
  }

  addAddress() {
    this.adresses.push(this.createAddressItem());
  }

  createAddressItem() {
    return this.fb.group({
      id: [''],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      unidade: [''],
      ibge: [''],
      gia: ['']
    });
  }

  save() {
    console.log('customerForm', this.customerForm);
    console.log('customerForm.value', this.customerForm.value);
    this.apiService.save(this.customerForm.value);
  }
}
