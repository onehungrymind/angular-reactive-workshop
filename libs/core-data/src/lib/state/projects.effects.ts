import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { ProjectsPartialState } from './projects.reducer';
import {
  LoadProjects,
  ProjectsLoaded,
  ProjectsLoadError,
  ProjectsActionTypes
} from './projects.actions';

@Injectable()
export class ProjectsEffects {
  @Effect()
  loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new ProjectsLoaded([]);
    },

    onError: (action: LoadProjects, error) => {
      console.error('Error', error);
      return new ProjectsLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>
  ) {}
}
