import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './funcionario.component';
import { ListFuncionariosComponent } from './list-funcionarios/list-funcionarios.component';
import { DeleteFuncionarioComponent } from './delete-funcionario/delete-funcionario.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListFuncionariosComponent,
  },
  {
    path: 'edit/:id',
    component: FuncionarioComponent,
  },
  {
    path: 'add',
    component: FuncionarioComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteFuncionarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule {}
