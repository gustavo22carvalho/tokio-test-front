import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Address } from '../model/address';
import { MatDialog } from '@angular/material/dialog';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  adresses = new BehaviorSubject<Address[]>([]);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addAddress(address: Address) {
    let newAdresses = this.adresses.getValue();
    newAdresses.push(address);
    this.adresses.next(newAdresses);
  }

  createAddress() {
    this.openDialog();
  }

  save() {
    let customer = this.customerForm.value;
    customer['adresses'] = this.adresses.getValue();
    this.apiService.saveCustomer(customer)
      .subscribe(
        response => {
          this.customerForm.patchValue({ id: response.id });
          alert('Cliente salvo com sucesso!');
          //TODO reload table
        },
        error => {
          alert(`Falha ao salvar cliente: ${error}`);
        }
      );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddressFormComponent, {
      width: '70%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('AFTER: The dialog was closed', result);
        this.addAddress(result);
      }
    });
  }
}
