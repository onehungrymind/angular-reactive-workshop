import { AuthGuardService } from './auth/auth-guard.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { NotificationsService } from './notifications/notifications.service';
import { ProjectsService } from './projects/projects.service';
import { ErrorInterceptor } from './error/error.interceptor';
import { CustomersService } from './customers/customers.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PROJECTS_FEATURE_KEY, initialState as projectsInitialState, projectsReducer } from './state/projects.reducer';
import { ProjectsEffects } from './state/projects.effects';
import { ProjectsFacade } from './state/projects.facade';
import { NxModule } from '@nrwl/nx';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

@NgModule({
  providers: [
    AuthService,
    AuthGuardService,
    NotificationsService,
    CustomersService,
    ProjectsService,
    ProjectsFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { projects: projectsReducer },
      { initialState : { projects : projectsInitialState } }
    ),
    EffectsModule.forRoot([ProjectsEffects]),
    StoreDevtoolsModule.instrument()
  ],
})
export class CoreDataModule {}
