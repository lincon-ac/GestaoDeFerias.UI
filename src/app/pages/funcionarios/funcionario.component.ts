import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent {
  tipoTela: number = 1; // 1 cadastro, 2 edição
  idFuncionario: number | null = null;
  funcionario: Funcionario | null = null;

  funcionarioForm: FormGroup;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public funcionarioService: FuncionarioService,
    public authService: AuthService
  ) {
    this.funcionarioForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.menuService.menuSelecionado = 2;

    const funcionarioIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const idFuncionario = funcionarioIdParam
      ? parseInt(funcionarioIdParam)
      : null;
    if (idFuncionario) {
      this.tipoTela = 2;
      this.idFuncionario = idFuncionario;
      await this.getFuncionario();
    } else {
      this.tipoTela = 1;
    }
  }

  async getFuncionario(): Promise<void> {
    if (this.idFuncionario) {
      this.ObterFuncionario(this.idFuncionario);
    }
  }

  ObterFuncionario(idFuncionario: number) {
    this.funcionarioService.ObterFuncionario(idFuncionario).subscribe(
      (response: Funcionario) => {
        this.funcionario = response;
        this.fillForm(response);
      },
      (error) => console.error(error),
      () => {}
    );
  }

  fillForm({ Nome, Matricula, Departamento }: Funcionario): void {
    this.funcionarioForm.get('name')?.setValue(Nome);
    this.funcionarioForm.get('matricula')?.setValue(Matricula);
    this.funcionarioForm.get('departamento')?.setValue(Departamento);
  }

  dadosForm() {
    return this.funcionarioForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    let item = new Funcionario();
    item.Nome = dados['name'].value;
    item.Matricula = dados['matricula'].value;
    item.Departamento = dados['departamento'].value;

    item.Id = this.funcionario?.Id;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaFerias = true;
    item.MesCopia = 0;
    item.AnoCopia = 0;

    if (this.idFuncionario) {
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
          this.funcionarioForm.reset();

          this.funcionarioService
            .CadastrarUsuarioNoFuncionario(
              response.Id,
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
