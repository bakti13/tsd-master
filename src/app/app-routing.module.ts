import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {EmployeesAddComponent} from './components/employees-add/employees-add.component';
import {EmployeesEditComponent} from './components/employees-edit/employees-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'promise/karyawanindex' },
  { path: 'promise/karyawanindex', component: EmployeesListComponent },
  { path: 'promise/karyawanindex/add', component: EmployeesAddComponent },
  { path: 'promise/karyawanindex/edit/:id', component: EmployeesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
