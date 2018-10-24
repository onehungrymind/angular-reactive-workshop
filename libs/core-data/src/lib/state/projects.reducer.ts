import { ProjectsAction, ProjectsActionTypes } from './projects.actions';

export const PROJECTS_FEATURE_KEY = 'projects';

/**
 * Interface for the 'Projects' data used in
 *  - ProjectsState, and
 *  - projectsReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface ProjectsState {
  list: Entity[]; // list of Projects; analogous to a sql normalized table
  selectedId?: string | number; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: any; // last none error (if any)
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}

export const initialState: ProjectsState = {
  list: [],
  loaded: false
};

export function projectsReducer(
  state: ProjectsState = initialState,
  action: ProjectsAction
): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectsLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
