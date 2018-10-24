import { Action } from '@ngrx/store';
import { Project } from '../projects/project.model';
import { Customer } from '../customers/customer.model';

export enum ProjectsActionTypes {
  ProjectsAction = '[Projects] Action',
  ProjectSelected = '[Projects] Selected',
  LoadProjects = '[Projects] Load Data',
  ProjectsLoaded = '[Projects] Data Loaded',
  AddProject = '[Projects] Add Data',
  ProjectAdded = '[Projects] Data Added',
  UpdateProject = '[Projects] Update Data',
  ProjectUpdated = '[Projects] Data Updated',
  DeleteProject = '[Projects] Delete Data',
  ProjectDeleted = '[Projects] Data Deleted',
  LoadCustomers = '[Customers] Load Data',
  CustomersLoaded = '[Customers] Data Loaded',
}


export class Projects implements Action {
  readonly type = ProjectsActionTypes.ProjectsAction;
}

export class ProjectSelected implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(public payload) { }
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
  constructor() { }
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(public payload: Project[]) { }
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(public payload: Project) { }
}

export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.ProjectAdded;
  constructor(public payload: Project) { }
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payload: Project) { }
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;
  constructor(public payload: Project) { }
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payload: Project) { }
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;
  constructor(public payload: Project) { }
}

export class LoadCustomers implements Action {
  readonly type = ProjectsActionTypes.LoadCustomers;
  constructor() {}
}

export class CustomersLoaded implements Action {
  readonly type = ProjectsActionTypes.CustomersLoaded;
  constructor(public payload: Customer[]) {}
}

export type ProjectsActions =
  | Projects
  | ProjectSelected
  | LoadProjects
  | ProjectsLoaded
  | AddProject
  | ProjectAdded
  | UpdateProject
  | ProjectUpdated
  | DeleteProject
  | ProjectDeleted
  | LoadCustomers
  | CustomersLoaded;

export const fromProjectsActions = {
  Projects,
  ProjectSelected,
  LoadProjects,
  ProjectsLoaded,
  AddProject,
  ProjectAdded,
  UpdateProject,
  ProjectUpdated,
  DeleteProject,
  ProjectDeleted,
  LoadCustomers,
  CustomersLoaded
};





