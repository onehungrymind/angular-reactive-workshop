import { Injectable } from '@angular/core';

import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { ProjectsPartialState } from './projects.reducer';
import { projectsQuery } from './projects.selectors';
import { LoadProjects, ProjectsActionTypes, ProjectSelected, AddProject, UpdateProject, DeleteProject, LoadCustomers } from './projects.actions';
import { filter } from 'rxjs/operators';

@Injectable()
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(projectsQuery.getAllProjects));
  allCustomers$ = this.store.pipe(select(projectsQuery.getAllCustomers));
  selectedProject$ = this.store.pipe(
    select(projectsQuery.getSelectedProject)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ProjectsActionTypes.AddProject ||
        action.type === ProjectsActionTypes.UpdateProject ||
        action.type === ProjectsActionTypes.DeleteProject
    )
  );

  constructor(
    private store: Store<ProjectsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectProject(projectId) {
    this.store.dispatch(new ProjectSelected(projectId));
  }

  loadAll() {
    this.store.dispatch(new LoadProjects());
  }

  addProject(project) {
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
  }

  loadCustomers() {
    this.store.dispatch(new LoadCustomers());
  }
}
