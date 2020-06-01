import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AddressListDataSource } from './address-list-datasource';
import { Address } from '../model/address';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Address>;
  dataSource: AddressListDataSource;
  @Input("data-list") data: any;

  displayedColumns = ['id', 'cep', 'logradouro', 'complemento', 'numero', 'bairro', 'localidade', 'uf', 'options'];

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.dataSource = new AddressListDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  delete(address){
    this.apiService.deleteAddresses(address)
      .subscribe(
        response => {
          alert('Endereço removido com sucesso')
        },
        error => alert('Falha ao remover cliente: ' + error.error['message'])
      );
  }
}
