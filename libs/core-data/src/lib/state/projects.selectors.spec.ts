import { Entity, ProjectsState } from './projects.reducer';
import { projectsQuery } from './projects.selectors';

describe('Projects Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProjectsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createProjects = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      projects: {
        list: [
          createProjects('PRODUCT-AAA'),
          createProjects('PRODUCT-BBB'),
          createProjects('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Projects Selectors', () => {
    it('getAllProjects() should return the list of Projects', () => {
      const results = projectsQuery.getAllProjects(storeState);
      const selId = getProjectsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedProjects() should return the selected Entity', () => {
      const result = projectsQuery.getSelectedProjects(storeState);
      const selId = getProjectsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = projectsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = projectsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
