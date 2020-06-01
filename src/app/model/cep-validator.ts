import { Validator } from "@angular/forms";

export class CepValidator implements Validator{
  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const cepErro = {cep: true};
    let value: string = control.value;
    if(value) {
      let cep = value.replace(/\D/g, '');
      let cepPattern = /^[0-9]{8}$/;
      return cepPattern.test(cep) ? null : cepErro;
    }
    else{
      return cepErro;
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    console.log('##### registerOnValidatorChange #####');
  }

}
