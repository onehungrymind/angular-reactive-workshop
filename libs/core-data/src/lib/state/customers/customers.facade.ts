import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import { CustomersState } from './customers.reducer';
import { selectAllCustomers } from '..';

@Injectable({
  providedIn: 'root'
})
export class CustomersFacade {
  allCustomers$ = this.store.pipe(select(selectAllCustomers));

  constructor(private store: Store<CustomersState>) {}

  loadCustomers() {
    this.store.dispatch(new CustomersActions.LoadCustomers());
  }
}
