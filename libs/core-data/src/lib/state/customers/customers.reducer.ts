import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Customer } from '../../customers/customer.model';
import { CustomersActions, CustomersActionTypes } from './customers.actions';

/**
 * Interface to the part of the Store containing CustomersState
 * and other information related to Customer.
 */
export interface CustomersState extends EntityState<Customer> {}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const initialState: CustomersState = adapter.getInitialState();

export function customersReducer(
  state = initialState,
  action: CustomersActions
): CustomersState {
  switch (action.type) {
    case CustomersActionTypes.CustomersLoaded: {
      return adapter.addAll(action.payload, state);
    }

    default:
      return state;
  }
}

// get the selectors
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

// select the array of widget ids
export const selectCustomerIds = selectIds;

// select the dictionary of widget entities
export const selectCustomerEntities = selectEntities;

// select the array of widgets
export const selectAllCustomers = selectAll;

