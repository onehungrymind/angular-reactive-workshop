import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { ProjectsPartialState } from './projects.reducer';
import { projectsQuery } from './projects.selectors';
import { LoadProjects } from './projects.actions';

@Injectable()
export class ProjectsFacade {
  loaded$ = this.store.pipe(select(projectsQuery.getLoaded));
  allProjects$ = this.store.pipe(select(projectsQuery.getAllProjects));
  selectedProjects$ = this.store.pipe(
    select(projectsQuery.getSelectedProjects)
  );

  constructor(private store: Store<ProjectsPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadProjects());
  }
}
