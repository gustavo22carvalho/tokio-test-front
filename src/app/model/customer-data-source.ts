import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {Customer} from './customer';
import {ApiService} from '../service/api.service';

export class CustomerDataSource implements DataSource<Customer> {

  private customerSubject = new BehaviorSubject<Customer[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  lastResponsePage: any = null;

  constructor(private apiService: ApiService) {

  }

  connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
    return this.customerSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.customerSubject.complete();
    this.loadingSubject.complete();
  }

  loadAccessLogs(page: number, size: number) {
    this.loadingSubject.next(true);

    this.apiService.findCustomers(page, size)
      .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(customersPage => {
          this.lastResponsePage = customersPage;
          return this.customerSubject.next(customersPage['content']);
        });
  }
}
