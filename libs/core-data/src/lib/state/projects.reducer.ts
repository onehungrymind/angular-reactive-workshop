import { ProjectsActionTypes, ProjectsActions } from './projects.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from '../projects/project.model';
import { Customer } from '../customers/customer.model';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<Project> {
  selectedId?: string | number; // which Projects record has been selected
  customers?: Customer[];
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}

export const initialState: ProjectsState = adapter.getInitialState({
  // additional entity state properties
  selectedId: null,
  customers: []
});


export function projectsReducer(
  state: ProjectsState = initialState,
  action: ProjectsActions
): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected: {
      return Object.assign({}, state, { selectedId: action.payload });
    }

    case ProjectsActionTypes.ProjectsLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case ProjectsActionTypes.ProjectAdded: {
      return adapter.addOne(action.payload, state);
    }

    case ProjectsActionTypes.ProjectUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case ProjectsActionTypes.ProjectDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProjectsActionTypes.CustomersLoaded: {
      return {...state, customers: action.payload};
    }
  }
  return state;
}

export const getSelectedProjectId = (state: ProjectsState) => state.selectedId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of item ids
const selectProjectIds = selectIds;

// select the dictionary of item entities
const selectProjectEntities = selectEntities;

// select the array of items
const selectAllProjects = selectAll;

// select the total item count
const selectProjectTotal = selectTotal;

export const projectsEntityQuery = {
  selectProjectIds,
  selectProjectEntities,
  selectAllProjects,
  selectProjectTotal
}
