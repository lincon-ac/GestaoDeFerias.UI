import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento';
import { SelectModel } from 'src/app/models/SelectModel';
import { Funcionario } from 'src/app/models/Funcionario';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MenuService } from 'src/app/services/menu.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
})
export class DepartamentoComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  tableListDepartamento: Array<Departamento>;
  listFuncionarios = new Array<SelectModel>();
  funcionarioselect = new SelectModel();

  departamentoForm: FormGroup;

  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public funcionarioService: FuncionarioService,
    public authService: AuthService,
    public departamentoService: DepartamentoService
  ) {}

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.configpag();
    this.ListarDepartamentosUsuario();

    this.departamentoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      funcionarioselect: ['', Validators.required],
    });

    this.ListaFuncionariosUsuario();
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
    this.tipoTela = 1;

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

  dadorForm() {
    return this.departamentoForm.controls;
  }

  enviar() {
    var dados = this.dadorForm();

    let item = new Departamento();
    item.Nome = dados['name'].value;
    item.Id = 0;
    item.IdFuncionario = parseInt(this.funcionarioselect.id);

    this.departamentoService.AdicionarDepartamento(item).subscribe(
      (response: Departamento) => {
        this.departamentoForm.reset();

        this.ListarDepartamentosUsuario();
      },
      (error) => console.error(error),
      () => {}
    );
  }

  ListaFuncionariosUsuario() {
    this.funcionarioService
      .ListaFuncionariosUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<Funcionario>) => {
        var listFuncionarios = [];

        reponse.forEach((x) => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;

          listFuncionarios.push(item);
        });

        this.listFuncionarios = listFuncionarios;
      });
  }

  goToListDepartamentos() {
    this.router.navigate(['/departamento/list']);
  }
}
