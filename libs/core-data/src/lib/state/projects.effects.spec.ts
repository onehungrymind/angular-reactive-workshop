import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ProjectsEffects } from './projects.effects';
import { LoadProjects, ProjectsLoaded } from './projects.actions';

describe('ProjectsEffects', () => {
  let actions: Observable<any>;
  let effects: ProjectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        ProjectsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ProjectsEffects);
  });

  describe('loadProjects$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadProjects() });
      expect(effects.loadProjects$).toBeObservable(
        hot('-a-|', { a: new ProjectsLoaded([]) })
      );
    });
  });
});
