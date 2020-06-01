import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AddressListDataSource } from './address-list-datasource';
import { Address } from '../model/address';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'cep', 'logradouro', 'complemento', 'numero', 'bairro', 'localidade', 'uf'];

  ngOnInit() {
    this.dataSource = new AddressListDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }
}
