import { Action } from '@ngrx/store';
import { Entity } from './projects.reducer';

export enum ProjectsActionTypes {
  LoadProjects = '[Projects] Load Projects',
  ProjectsLoaded = '[Projects] Projects Loaded',
  ProjectsLoadError = '[Projects] Projects Load Error'
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
}

export class ProjectsLoadError implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoadError;
  constructor(public payload: any) {}
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(public payload: Entity[]) {}
}

export type ProjectsAction = LoadProjects | ProjectsLoaded | ProjectsLoadError;

export const fromProjectsActions = {
  LoadProjects,
  ProjectsLoaded,
  ProjectsLoadError
};
