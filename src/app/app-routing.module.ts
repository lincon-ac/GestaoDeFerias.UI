import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './pages/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'funcionario',
    loadChildren: () =>
      import('./pages/funcionarios/funcionario.module').then(
        (m) => m.FuncionarioModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'departamento',
    loadChildren: () =>
      import('./pages/departamento/departamento.module').then(
        (m) => m.DepartamentoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ferias',
    loadChildren: () =>
      import('./pages/ferias/ferias.module').then((m) => m.FeriasModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
