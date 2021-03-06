import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerDataSource } from '../model/customer-data-source';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  dataSource: CustomerDataSource;
  displayedColumns = ['id', 'name', 'email', 'options'];

  @ViewChild(MatPaginator, {read: null, static: false}) paginator: MatPaginator;

  @ViewChild(MatSort, {read: null, static: false}) sort: MatSort;

  @ViewChild('input', {read: null, static: false}) input: ElementRef;

  constructor(private apiService: ApiService) {  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadAccessLogsPage())
      )
      .subscribe();
  }

  ngOnInit() {
    this.dataSource = new CustomerDataSource(this.apiService);
    this.dataSource.loadAccessLogs(0, 10);
  }

  loadAccessLogsPage() {
    this.dataSource.loadAccessLogs(
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

  delete(customer){
    this.apiService.deleteCustomer(customer)
      .subscribe(
        response => {
          this.loadAccessLogsPage();
          alert('Cliente removido com sucesso')
        },
        error => alert('Falha ao remover cliente: ' + error.error['message'])
      );
  }

}
