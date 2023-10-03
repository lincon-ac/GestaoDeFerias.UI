import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoComponent } from './departamento.component';
import { ListDepartamentosComponent } from './list-departamentos/list-departamentos.component';
import { DeleteDepartamentoComponent } from './delete-departamento/delete-departamento.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListDepartamentosComponent,
  },
  {
    path: 'edit/:id',
    component: DepartamentoComponent,
  },
  {
    path: 'add',
    component: DepartamentoComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteDepartamentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentoRoutingModule {}
