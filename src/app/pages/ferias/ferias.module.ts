import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { FeriasComponent } from './ferias.component';
import { ListFeriasComponent } from './list-ferias/list-ferias.component';
import { FeriasRoutingModule } from './ferias-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  providers: [],
  declarations: [FeriasComponent, ListFeriasComponent],
  imports: [
    CommonModule,
    FeriasRoutingModule,
    NavbarModule,
    SidebarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatIconModule,
  ],
})
export class FeriasModule {}
