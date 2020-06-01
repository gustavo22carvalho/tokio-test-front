import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Address } from '../model/address';
import { MatDialog } from '@angular/material/dialog';
import { AddressFormComponent } from '../address-form/address-form.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm: FormGroup;
  addresses = new BehaviorSubject<Address[]>([]);

  constructor(
    private route: ActivatedRoute,
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

    let idCustomer = this.route.snapshot.paramMap.get('id');
    if(idCustomer !== 'novo'){
      this.apiService.findCustomerById(idCustomer)
      .subscribe(
        reponse => this.customerForm.setValue(reponse),
        error => alert('Faha ao consultar cliente: ' + error.error['message'])
      );

      this.apiService.listAddressesByCustomer(idCustomer)
      .subscribe(
        reponse => this.addresses.next(reponse),
        error => alert('Faha ao consultar endereços: ' + error.error['message'])
      );
    }
  }

  addAddress(address: Address) {
    let newAdresses = this.addresses.getValue();
    newAdresses.push(address);
    this.addresses.next(newAdresses);
  }

  createAddress() {
    this.openDialog();
  }

  save() {
    let customer = this.customerForm.value;
    this.apiService.saveCustomer(customer)
      .subscribe(
        response => {
          this.customerForm.patchValue({ id: response.id });
          alert('Cliente salvo com sucesso!');
          alert('Salvando endereços!'); //TODO adicionar notificação assincrona
          this.apiService
            .saveAddresses(this.addresses.getValue()
              .filter(address => address.id == null || address.id == undefined || address.id.toString().length <= 0)
              .map(address => {
                address['customer'] = {id: this.customerForm.get('id').value};
                return address;
              }))
            .subscribe(
              response => {
                this.apiService.listAddressesByCustomer(this.customerForm.get('id').value)
                  .subscribe(
                    response => this.addresses.next(response),
                    error => alert(error.error['message'])
                  );
              },
              erro => alert('Falha ao salvar endereços')
            );
        },
        error => alert(`Falha ao salvar cliente: ${error.error['message']}`)
      );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddressFormComponent, {
      width: '70%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addAddress(result);
      }
    });
  }
}
