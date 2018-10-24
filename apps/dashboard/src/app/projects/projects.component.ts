import { Component, OnInit } from '@angular/core';
import { Project, ProjectsFacade, Customer, CustomersFacade } from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  customers$: Observable<Customer[]> = this.customersFacade.allCustomers$;
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  currentProject$: Observable<Project> = this.projectsFacade.currentProject$;

  constructor(
    private projectsFacade: ProjectsFacade,
    private customersFacade: CustomersFacade
  ) { }

  ngOnInit() {
    this.customersFacade.loadCustomers();
    this.projectsFacade.loadProjects();
    this.projectsFacade.mutations$.subscribe(_ => this.resetCurrentProject());
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.selectProject({id: null});
  }

  selectProject(project) {
    this.projectsFacade.selectProject(project.id);
  }

  saveProject(project) {
    if (!project.id) {
      this.projectsFacade.addProject(project);
    } else {
      this.projectsFacade.updateProject(project);
    }
  }

  deleteProject(project) {
    this.projectsFacade.deleteProject(project);
  }
  // projects$: Observable<Project[]>;
  // customers$: Observable<Customer[]>;
  // currentProject: Project;

  // constructor(
  //   private projectsService: ProjectsService,
  //   private customerService: CustomersService,
  //   private ns: NotificationsService) { }

  // ngOnInit() {
  //   this.getProjects();
  //   this.getCustomers();
  //   this.resetCurrentProject();
  // }

  // resetCurrentProject() {
  //   this.currentProject = emptyProject;
  // }

  // selectProject(project) {
  //   this.currentProject = project;
  // }

  // cancel(project) {
  //   this.resetCurrentProject();
  // }

  // getCustomers() {
  //   this.customers$ = this.customerService.all();
  // }

  // getProjects() {
  //   this.projects$ = this.projectsService.all();
  // }

  // saveProject(project) {
  //   if (!project.id) {
  //     this.createProject(project);
  //   } else {
  //     this.updateProject(project);
  //   }
  // }

  // createProject(project) {
  //   this.projectsService.create(project)
  //     .subscribe(response => {
  //       this.ns.emit('Project created!');
  //       this.getProjects();
  //       this.resetCurrentProject();
  //     });
  // }

  // updateProject(project) {
  //   this.projectsService.update(project)
  //     .subscribe(response => {
  //       this.ns.emit('Project saved!');
  //       this.getProjects();
  //       this.resetCurrentProject();
  //     });
  // }

  // deleteProject(project) {
  //   this.projectsService.delete(project)
  //     .subscribe(response => {
  //       this.ns.emit('Project deleted!');
  //       this.getProjects();
  //       this.resetCurrentProject();
  //     });
  // }
}

