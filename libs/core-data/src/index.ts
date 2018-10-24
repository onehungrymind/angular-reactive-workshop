export { AuthGuardService } from './lib/auth/auth-guard.service';
export { AuthService } from './lib/auth/auth.service';
export { CoreDataModule } from './lib/core-data.module';
export { NotificationsService } from './lib/notifications/notifications.service';
export { CustomersService } from './lib/customers/customers.service';
export { Customer } from './lib/customers/customer.model';
export { Project } from './lib/projects/project.model';
export { ProjectsService } from './lib/projects/projects.service';
export { CustomersFacade } from './lib/state/customers/customers.facade';

// Expose projects state
export { ProjectsState, initialProjects, selectAllProjects } from './lib/state/projects/projects.reducer';
export { SelectProject, LoadProjects, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';
