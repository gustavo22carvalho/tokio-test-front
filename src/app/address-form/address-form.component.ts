import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from '../model/address';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CepValidator } from '../model/cep-validator';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddressFormComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: Address
  ) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      id: [''],
      cep: ['68743170', [Validators.required, new CepValidator() ]],
      logradouro: ['', [Validators.required]],
      complemento: [''],
      numero: ['371', Validators.required],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      unidade: [''],
      ibge: [''],
      gia: ['']
    });
  }

  onSubmit() {
    console.log("SUBMIT - AddressForm")
    let address = this.addressForm.value as Address;
    // this.data.idCustomer = address.cep;
    this.dialogRef.close(address);
  }

  onReset() {
    this.addressForm.reset();
  }

  findCep(){
    let cepControl = this.addressForm.get('cep');
    if(cepControl.valid){
      this.apiService.findCep(cepControl.value)
        .subscribe(
          response => {
            if("erro" in response){
              alert('Cep não foi encontrado')
            } else {
              this.setValuesForm(response);
            }
          },
          error => {
            alert(error);
          }
        );
    }
  }

  private setValuesForm(address: Address): void {
    this.addressForm.patchValue({
      logradouro: address.logradouro,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf,
      unidade: address.unidade,
      ibge: address.ibge,
      gia: address.gia
    });
  }
}
