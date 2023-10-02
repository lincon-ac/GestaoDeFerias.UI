import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ferias } from 'src/app/models/Ferias';
import { SelectModel } from 'src/app/models/SelectModel';
import { Funcionario } from 'src/app/models/Funcionario';
import { AuthService } from 'src/app/services/auth.service';
import { FeriasService } from 'src/app/services/ferias.service';
import { MenuService } from 'src/app/services/menu.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { dateRangeValidator } from 'src/app/validators/dateRangeValidator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss'],
})
export class FeriasComponent {
  tipoTela: number = 1; // 1 cadastro, 2 edição
  idFerias: number | null = null;
  ferias: Ferias | null = null;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public funcionarioService: FuncionarioService,
    public authService: AuthService,
    public feriasService: FeriasService
  ) {
    this.feriasForm = this.formBuilder.group({
      funcionarioselect: ['', Validators.required],
      dataInicio: ['', [Validators.required, dateRangeValidator()]],
      dataEncerramento: ['', [Validators.required, dateRangeValidator()]],
    });
  }

  listFuncionarios = new Array<SelectModel>();
  funcionarioselect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;

  feriasForm: FormGroup;

  async ngOnInit() {
    this.menuService.menuSelecionado = 4;

    await this.ListaFuncionariosUsuario();

    const feriasIdParam = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as string;
    const idFerias = feriasIdParam ? parseInt(feriasIdParam) : null;
    if (idFerias) {
      this.tipoTela = 2;
      this.idFerias = idFerias;
      await this.getFerias();
    } else {
      this.tipoTela = 1;
    }
  }

  async getFerias(): Promise<void> {
    if (this.idFerias) {
      this.ObterFerias(this.idFerias);
    }
  }

  ObterFerias(idFerias: number) {
    this.feriasService.ObterFerias(idFerias).subscribe(
      (response: Ferias) => {
        this.ferias = response;
        console.log(response);
        this.fillForm(response);
      },
      (error) => console.error(error),
      () => {}
    );
  }

  fillForm({ FuncionarioId, DataInicio, DataEncerramento }: Ferias): void {
    this.feriasForm.get('funcionarioselect')?.setValue(FuncionarioId);
    const funcionarioModel = new SelectModel();
    funcionarioModel.id = FuncionarioId.toString();
    funcionarioModel.name = this.listFuncionarios.find(
      (funcionario) => funcionario.id == FuncionarioId.toString()
    ).name;
    this.funcionarioselect = funcionarioModel;
    this.feriasForm
      .get('dataInicio')
      ?.setValue(DataInicio.toString().split('T')[0]);
    this.feriasForm
      .get('dataEncerramento')
      ?.setValue(DataEncerramento.toString().split('T')[0]);
  }

  dadosForm() {
    return this.feriasForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    let item = new Ferias();
    item.Id = this.idFerias ?? 0;
    item.FuncionarioId = parseInt(this.funcionarioselect.id);
    item.Pago = this.checked;
    item.DataInicio = dados['dataInicio'].value;
    item.DataEncerramento = dados['dataEncerramento'].value;

    if (this.idFerias) {
      this.feriasService.AtualizarFerias(item).subscribe(
        (response: Ferias) => {
          this.feriasForm.reset();
          this.goToListFerias();
        },
        (error) => console.error(error),
        () => {}
      );
    } else {
      this.feriasService.AdicionarFerias(item).subscribe(
        (response: Ferias) => {
          this.feriasForm.reset();
          this.goToListFerias();
        },
        (error) => console.error(error),
        () => {}
      );
    }
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }

  async ListaFuncionariosUsuario() {
    await this.funcionarioService
      .ListaFuncionariosUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<Funcionario>) => {
        var listFuncionario = [];

        reponse.forEach((x) => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;

          listFuncionario.push(item);
        });

        this.listFuncionarios = listFuncionario;
      });
  }

  goToListFerias() {
    this.router.navigate(['/ferias/list']);
  }
}
