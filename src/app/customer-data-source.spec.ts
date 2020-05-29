import { CustomerDataSource } from './customer-data-source';
import { ApiService } from './api.service';

describe('CustomerDataSource', () => {
  it('should create an instance', () => {
    expect(new CustomerDataSource(new ApiService(null))).toBeTruthy();
  });
});
