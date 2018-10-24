import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { ProjectsEffects } from './projects.effects';
import { ProjectsFacade } from './projects.facade';

import { projectsQuery } from './projects.selectors';
import { LoadProjects, ProjectsLoaded } from './projects.actions';
import {
  ProjectsState,
  Entity,
  initialState,
  projectsReducer
} from './projects.reducer';

interface TestSchema {
  projects: ProjectsState;
}

describe('ProjectsFacade', () => {
  let facade: ProjectsFacade;
  let store: Store<TestSchema>;
  let createProjects;

  beforeEach(() => {
    createProjects = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('projects', projectsReducer, { initialState }),
          EffectsModule.forFeature([ProjectsEffects])
        ],
        providers: [ProjectsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ProjectsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allProjects$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allProjects$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `ProjectsLoaded` to manually submit list for state management
     */
    it('allProjects$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allProjects$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new ProjectsLoaded([createProjects('AAA'), createProjects('BBB')])
        );

        list = await readFirst(facade.allProjects$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
