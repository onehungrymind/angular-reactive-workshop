import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState, projectsEntityQuery } from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
const getProjectsState = createFeatureSelector<ProjectsState>('projects');

const getAllProjects = createSelector(
  getProjectsState,
  projectsEntityQuery.selectAllProjects
);

const getSelectedId = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.selectedId
);

const getSelectedProject = createSelector(
  getAllProjects,
  getSelectedId,
  (projects, id) => {
    const result = projects.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

const getAllCustomers = createSelector(
  getProjectsState,
  (state: ProjectsState) => state.customers
);

export const projectsQuery = {
  getAllProjects,
  getSelectedProject,
  getAllCustomers
};
