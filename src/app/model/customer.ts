import { Address } from './address';

export class Customer {

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  id: number;
  name: string;
  email: string;
  adresses: Address[];
}
