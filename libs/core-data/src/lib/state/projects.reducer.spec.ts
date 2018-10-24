import { ProjectsLoaded } from './projects.actions';
import {
  ProjectsState,
  Entity,
  initialState,
  projectsReducer
} from './projects.reducer';

describe('Projects Reducer', () => {
  const getProjectsId = it => it['id'];
  let createProjects;

  beforeEach(() => {
    createProjects = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Projects actions ', () => {
    it('should return set the list of known Projects', () => {
      const projectss = [
        createProjects('PRODUCT-AAA'),
        createProjects('PRODUCT-zzz')
      ];
      const action = new ProjectsLoaded(projectss);
      const result: ProjectsState = projectsReducer(initialState, action);
      const selId: string = getProjectsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = projectsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
