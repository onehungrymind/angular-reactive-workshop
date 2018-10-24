import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { ProjectsPartialState } from './projects.reducer';
import {
  LoadProjects,
  ProjectsLoaded,
  ProjectsActionTypes,
  ProjectAdded,
  AddProject,
  UpdateProject,
  ProjectUpdated,
  DeleteProject,
  ProjectDeleted,
  LoadCustomers,
  CustomersLoaded
} from './projects.actions';
import { ProjectsService } from '../projects/projects.service';
import { map, tap } from 'rxjs/operators';
import { Project } from '../projects/project.model';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/customer.model';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ProjectsEffects {
  @Effect()
  loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsPartialState) => {
      return this.projectsService
        .all()
        .pipe(map((res: Project[]) => new ProjectsLoaded(res)));
    },

    onError: (action: LoadProjects, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: (action: AddProject, state: ProjectsPartialState) => {
        return this.projectsService
          .create(action.payload)
          .pipe(
            map((res: Project) => new ProjectAdded(res)),
            tap(() => this.ns.emit('Project created!'))
          );
      },

      onError: (action: AddProject, error) => {
        console.error('Error', error);
      }
    }
  );

  @Effect()
  updateProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.UpdateProject,
    {
      run: (action: UpdateProject, state: ProjectsPartialState) => {
        return this.projectsService
          .update(action.payload)
          .pipe(
            map((res: Project) => new ProjectUpdated(res)),
            tap(() => this.ns.emit('Project saved!'))
          );
      },

      onError: (action: UpdateProject, error) => {
        console.error('Error', error);
      }
    }
  );

  @Effect()
  deleteProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.DeleteProject,
    {
      run: (action: DeleteProject, state: ProjectsPartialState) => {
        return this.projectsService
          .delete(action.payload)
          .pipe(
            map(_ => new ProjectDeleted(action.payload)),
            tap(() => this.ns.emit('Project deleted!'))
          );
      },

      onError: (action: DeleteProject, error) => {
        console.error('Error', error);
      }
    }
  );

  @Effect()
  loadCustomers$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadCustomers, {
    run: (action: LoadCustomers, state: ProjectsPartialState) => {
      return this.customersService
        .all()
        .pipe(map((res: Customer[]) => new CustomersLoaded(res)));
    },

    onError: (action: LoadCustomers, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService,
    private customersService: CustomersService,
    private ns: NotificationsService
  ) {}
}
