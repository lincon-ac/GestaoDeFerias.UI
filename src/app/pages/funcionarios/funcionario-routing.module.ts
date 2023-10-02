import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './funcionario.component';
import { ListFuncionariosComponent } from './list-funcionarios/list-funcionarios.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule {}
