import { Action } from '@ngrx/store';

export enum CustomersActionTypes {
  LoadCustomers = '[Customers] Load Data',
  CustomersLoaded = '[Customers] Data Loaded'
}

export class LoadCustomers implements Action {
  readonly type = CustomersActionTypes.LoadCustomers;
  constructor() {}
}

export class CustomersLoaded implements Action {
  readonly type = CustomersActionTypes.CustomersLoaded;
  constructor(public payload: any) {}
}

export type CustomersActions = LoadCustomers | CustomersLoaded;
