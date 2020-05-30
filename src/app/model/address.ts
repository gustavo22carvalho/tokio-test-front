export class Address {

  constructor(cep: string, logradouro: string, complemento: string, bairro: string, localidade: string, uf: string,
              unidade: string, ibge: string, gia: string ) {
    this.cep = cep;
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.unidade = unidade;
    this.ibge = ibge;
    this.gia = gia;
  }

  id: number;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
}
