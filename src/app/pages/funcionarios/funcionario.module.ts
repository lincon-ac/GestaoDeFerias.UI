import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { FuncionarioComponent } from './funcionario.component';
import { ListFuncionariosComponent } from './list-funcionarios/list-funcionarios.component';
import { DeleteFuncionarioComponent } from './delete-funcionario/delete-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  providers: [],
  declarations: [
    FuncionarioComponent,
    ListFuncionariosComponent,
    DeleteFuncionarioComponent,
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    NavbarModule,
    SidebarModule,
    ReactiveFormsModule,

    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    MatIconModule,
  ],
})
export class FuncionarioModule {}
