import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
const getProjectsState = createFeatureSelector<ProjectsState>('projects');

const getLoaded = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.loaded
);
const getError = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.error
);

const getAllProjects = createSelector(
  getProjectsState,
  getLoaded,
  (state: ProjectsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.selectedId
);
const getSelectedProjects = createSelector(
  getAllProjects,
  getSelectedId,
  (projects, id) => {
    const result = projects.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const projectsQuery = {
  getLoaded,
  getError,
  getAllProjects,
  getSelectedProjects
};
