import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeriasComponent } from './ferias.component';
import { ListFeriasComponent } from './list-ferias/list-ferias.component';
import { DeleteFeriasComponent } from './delete-ferias/delete-ferias.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListFeriasComponent,
  },
  {
    path: 'edit/:id',
    component: FeriasComponent,
  },
  {
    path: 'add',
    component: FeriasComponent,
  },
  {
    path: 'delete/:id',
    component: DeleteFeriasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeriasRoutingModule {}
