import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ferias } from 'src/app/models/Ferias';
import { AuthService } from 'src/app/services/auth.service';
import { FeriasService } from 'src/app/services/ferias.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-ferias',
  templateUrl: './list-ferias.component.html',
  styleUrls: ['./list-ferias.component.scss'],
})
export class ListFeriasComponent {
  tableListFerias: Array<Ferias>;

  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public feriasService: FeriasService
  ) {}

  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.configpag();
    this.ListarFeriasUsuario();
  }

  ListarFeriasUsuario() {
    this.feriasService
      .ListarFeriasUsuario(this.authService.getEmailUser())
      .subscribe(
        (response: Array<Ferias>) => {
          this.tableListFerias = response;
        },
        (error) => console.error(error),
        () => {}
      );
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

  goToEditPage(IdFerias) {
    this.router.navigate(['/ferias/edit', IdFerias]);
  }

  goToAddPage() {
    this.router.navigate(['/ferias/add']);
  }
}
