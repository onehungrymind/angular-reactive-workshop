import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from '@workshop/core-data';

import { ProjectsActions, ProjectsActionTypes } from './projects.actions';

/**
 * Interface to the part of the Store containing ProjectsState
 * and other information related to ProjectsData.
 */
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();
export const initialState: ProjectsState = adapter.getInitialState({
  // additional entity state properties
  selectedProjectId: null,
});

export function projectsReducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected: {
      return Object.assign({}, state, { selectedProjectId: action.payload });
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

    default:
      return state;
  }
}

export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

// get the selectors
export const {
  // select the array of project ids
  selectIds: selectProjectIds,
  // select the dictionary of project entities
  selectEntities: selectProjectEntities,
  // select the array of projects
  selectAll: selectAllProjects,
  // select the total project count
  selectTotal: selectProjectTotal
} = adapter.getSelectors();