import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionario';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.component.html',
  styleUrls: ['./list-funcionarios.component.scss'],
})
export class ListFuncionariosComponent {
  tableListFuncionarios: Array<Funcionario>;

  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public funcionarioService: FuncionarioService,
    public authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.menuService.menuSelecionado = 2;

    this.configpag();

    this.ListaFuncionariosUsuario();
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

  ListaFuncionariosUsuario() {
    this.funcionarioService
      .ListaFuncionariosUsuario(this.authService.getEmailUser())
      .subscribe(
        (response: Array<Funcionario>) => {
          this.tableListFuncionarios = response;
        },
        (error) => console.error(error),
        () => {}
      );
  }

  goToEditPage(FuncionarioId: number) {
    this.router.navigate(['/funcionario/edit', FuncionarioId]);
  }

  goToDeletePage(FuncionarioId: number) {
    this.router.navigate(['/funcionario/delete', FuncionarioId]);
  }

  goToAddPage() {
    this.router.navigate(['/funcionario/add']);
  }
}
