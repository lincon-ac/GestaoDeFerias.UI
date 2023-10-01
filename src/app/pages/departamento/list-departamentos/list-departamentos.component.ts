import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/Departamento';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-departamentos',
  templateUrl: './list-departamentos.component.html',
  styleUrls: ['./list-departamentos.component.scss'],
})
export class ListDepartamentosComponent {
  tableListDepartamento: Array<Departamento>;

  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  constructor(
    public menuService: MenuService,
    private router: Router,
    public authService: AuthService,
    public departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.configpag();
    this.ListarDepartamentosUsuario();
  }

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina,
    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  ListarDepartamentosUsuario(): void {
    this.departamentoService
      .ListarDepartamentosUsuario(this.authService.getEmailUser())
      .subscribe(
        (response: Array<Departamento>) => {
          this.tableListDepartamento = response;
        },
        (error) => console.error(error),
        () => {}
      );
  }

  goToAddPage() {
    this.router.navigate(['/departamento/add']);
  }
}
