import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllProjects, selectCurrentProject } from '..';
import { ProjectsActionTypes } from './projects.actions';
import * as ProjectsActions from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  allProjects$ = this.store.pipe(select(selectAllProjects));
  currentProject$ = this.store.pipe(select(selectCurrentProject));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProjectsActionTypes.AddProject
        || action.type === ProjectsActionTypes.UpdateProject
        || action.type === ProjectsActionTypes.DeleteProject
      )
    );

  constructor(private store: Store<ProjectsState>, private actions$: ActionsSubject) {}

  selectProject(itemId) {
    this.store.dispatch(new ProjectsActions.ProjectSelected(itemId));
  }

  loadProjects() {
    this.store.dispatch(new ProjectsActions.LoadProjects());
  }

  addProject(item) {
    this.store.dispatch(new ProjectsActions.AddProject(item));
  }

  updateProject(item) {
    this.store.dispatch(new ProjectsActions.UpdateProject(item));
  }

  deleteProject(item) {
    this.store.dispatch(new ProjectsActions.DeleteProject(item));
  }
}
