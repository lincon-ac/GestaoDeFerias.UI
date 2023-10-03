import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento';
import { SelectModel } from 'src/app/models/SelectModel';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MenuService } from 'src/app/services/menu.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
})
export class DepartamentoComponent {
  tipoTela: number = 1; // 1 listagem, 2 cadastro, 3 edição
  departamentoId: number;
  departamento: Departamento | null = null;

  tableListDepartamento: Array<Departamento>;
  listFuncionarios = new Array<SelectModel>();

  departamentoForm: FormGroup;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public funcionarioService: FuncionarioService,
    public authService: AuthService,
    public departamentoService: DepartamentoService
  ) {
    this.departamentoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.ListarDepartamentosUsuario();

    const departamentoIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const departamentoId = departamentoIdParam
      ? parseInt(departamentoIdParam)
      : null;
    if (departamentoId) {
      this.tipoTela = 2;
      this.departamentoId = departamentoId;
      await this.getDepartamento();
    } else {
      this.tipoTela = 1;
    }
  }

  async getDepartamento(): Promise<void> {
    if (this.departamentoId) {
      this.ObterDepartamento(this.departamentoId);
    }
  }

  ObterDepartamento(departamentoId: number) {
    this.departamentoService.ObterDepartamento(departamentoId).subscribe(
      (response: Departamento) => {
        this.departamento = response;
        this.fillForm(response);
      },
      (error) => console.error(error),
      () => {}
    );
  }

  fillForm({ Nome }: Departamento): void {
    this.departamentoForm.get('name')?.setValue(Nome);
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
    item.Id = this.departamento?.Id;

    if (this.departamentoId) {
      this.departamentoService.AtualizarDepartamento(item).subscribe(
        (response: Departamento) => {
          this.departamentoForm.reset();
          this.goToListDepartamentos();
        },
        (error) => console.error(error),
        () => {}
      );
    } else {
      this.departamentoService.AdicionarDepartamento(item).subscribe(
        (response: Departamento) => {
          this.departamentoForm.reset();

          this.ListarDepartamentosUsuario();
        },
        (error) => console.error(error),
        () => {}
      );
    }
  }

  goToListDepartamentos() {
    this.router.navigate(['/departamento/list']);
  }
}
