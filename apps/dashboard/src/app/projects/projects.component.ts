import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsFacade } from '@workshop/core-data';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  customers$: Observable<Customer[]> = this.projectsFacade.allCustomers$;
  currentProject: Project;
  currentProject$: Observable<Project> = this.projectsFacade.selectedProject$;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private projectsFacade: ProjectsFacade
  ) {}

  ngOnInit() {
    this.projectsFacade.loadAll();
    this.projectsFacade.loadCustomers();
    this.projectsFacade.mutations$.subscribe(_ => this.resetCurrentProject());
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.selectProject(emptyProject);
  }

  selectProject(project) {
    this.projectsFacade.selectProject(project.id);
  }

  cancel() {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.projectsFacade.addProject(project)
    } else {
      this.projectsFacade.updateProject(project);
    }
  }

  deleteProject(project) {
    this.projectsFacade.deleteProject(project);
  }
}

