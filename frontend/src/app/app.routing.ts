import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {TaskdetailsComponent} from './components/taskdetails/taskdetails.component'
import {AddToDoComponent} from './components/add-to-do/add-to-do.component'

const routes: Routes = [
  { path: '', pathMatch:'full', component: DashboardComponent },
  { path: 'task/:id', component: TaskdetailsComponent },
  { path: 'addtodo', component: AddToDoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }