import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  { path: 'clientes/:id', component: CustomerFormComponent },
  { path: 'clientes/novo', component: CustomerFormComponent },
  { path: 'clientes', component: CustomerListComponent },
  { path: '',   redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
