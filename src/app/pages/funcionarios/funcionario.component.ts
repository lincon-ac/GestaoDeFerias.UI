import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectModel } from 'src/app/models/SelectModel';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/Departamento';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent {
  tipoTela: number = 1; // 1 cadastro, 2 edição
  funcionarioId: number | null = null;
  funcionario: Funcionario | null = null;

  departamentoSelect = new SelectModel();
  listDepartamentos = new Array<SelectModel>();

  funcionarioForm: FormGroup;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public funcionarioService: FuncionarioService,
    public departamentoService: DepartamentoService,
    public authService: AuthService
  ) {
    this.funcionarioForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      departamentoSelect: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.menuService.menuSelecionado = 2;

    this.ListarDepartamentosUsuario();

    const funcionarioIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const funcionarioId = funcionarioIdParam
      ? parseInt(funcionarioIdParam)
      : null;
    if (funcionarioId) {
      this.tipoTela = 2;
      this.funcionarioId = funcionarioId;
      await this.getFuncionario();
    } else {
      this.tipoTela = 1;
    }
  }

  async getFuncionario(): Promise<void> {
    if (this.funcionarioId) {
      this.ObterFuncionario(this.funcionarioId);
    }
  }

  ObterFuncionario(funcionarioId: number) {
    this.funcionarioService.ObterFuncionario(funcionarioId).subscribe(
      (response: Funcionario) => {
        this.funcionario = response;
        this.fillForm(response);
      },
      (error) => console.error(error),
      () => {}
    );
  }

  fillForm({ Nome, Matricula, DepartamentoId }: Funcionario): void {
    this.funcionarioForm.get('name')?.setValue(Nome);
    this.funcionarioForm.get('matricula')?.setValue(Matricula);
    const departamentoModel = new SelectModel();
    departamentoModel.id = DepartamentoId.toString();
    departamentoModel.name = this.listDepartamentos.find(
      (funcionario) => funcionario.id == DepartamentoId.toString()
    ).name;
    this.departamentoSelect = departamentoModel;
  }

  ListarDepartamentosUsuario() {
    this.departamentoService
      .ListarDepartamentosUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<Departamento>) => {
        var listaCatagorias = [];

        reponse.forEach((x) => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;
          listaCatagorias.push(item);
        });

        this.listDepartamentos = listaCatagorias;
      });
  }

  dadosForm() {
    return this.funcionarioForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    let item = new Funcionario();
    item.Nome = dados['name'].value;
    item.Matricula = dados['matricula'].value;
    item.DepartamentoId = parseInt(this.departamentoSelect.id);

    item.Id = this.funcionario?.Id;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaFerias = true;

    if (this.funcionarioId) {
      this.funcionarioService.AtualizarFuncionario(item).subscribe(
        (response: Funcionario) => {
          this.funcionarioForm.reset();
          this.goToListFuncionarios();
        },
        (error) => console.error(error),
        () => {}
      );
    } else {
      this.funcionarioService.AdicionarFuncionario(item).subscribe(
        (response: Funcionario) => {
          this.funcionarioId = response.Id;
          this.funcionarioForm.reset();

          this.funcionarioService
            .CadastrarUsuarioNoFuncionario(
              this.funcionarioId,
              this.authService.getEmailUser()
            )
            .subscribe(
              (response: any) => {
                this.goToListFuncionarios();
              },
              (error) => console.error(error),
              () => {}
            );
        },
        (error) => console.error(error),
        () => {}
      );
    }
  }

  goToListFuncionarios() {
    this.router.navigate(['/funcionario/list']);
  }
}
