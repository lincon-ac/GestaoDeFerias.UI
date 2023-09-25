import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/Departamento';
import { Ferias } from 'src/app/models/Ferias';
import { SelectModel } from 'src/app/models/SelectModel';
import { FuncionarioFinanceiro } from 'src/app/models/FuncionarioFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { FeriasService } from 'src/app/services/ferias.service';
import { MenuService } from 'src/app/services/menu.service';
import { Funcionarioservice } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.scss']
})
export class FeriasComponent {


  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListFerias: Array<Ferias>;
  id: string;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  cadastro() {
    this.tipoTela = 2;
    this.feriasForm.reset();
  }

  mudarItemsPorPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }


  ListarFeriasUsuario() {
    this.tipoTela = 1;

    this.feriasService.ListarFeriasUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Ferias>) => {

        this.tableListFerias = response;

      }, (error) => console.error(error),
        () => { })

  }


  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public funcionarioservice: Funcionarioservice, public authService: AuthService,
    public departamentoService: DepartamentoService,
    public feriasService: FeriasService) {
  }

  listFuncionarios = new Array<SelectModel>();
  funcionarioselect = new SelectModel();


  listDepartamentos = new Array<SelectModel>();
  departamentoSelect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;

  feriasForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.configpag();
    this.ListarFeriasUsuario();

    this.feriasForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]],
          valor: ['', [Validators.required]],
          data: ['', [Validators.required]],
          funcionarioselect: ['', [Validators.required]],
          departamentoSelect: ['', [Validators.required]],
        }
      )


    this.ListarDepartamentosUsuario();
  }


  dadorForm() {
    return this.feriasForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    let item = new Ferias();
    item.Nome = dados["name"].value;
    item.Valor = dados["valor"].value;
    item.Pago = this.checked;
    item.DataVencimento = dados["data"].value;
    item.IdDepartamento = parseInt(this.departamentoSelect.id);

    this.feriasService.AdicionarFerias(item)
      .subscribe((response: Ferias) => {

        this.feriasForm.reset();
        this.ListarFeriasUsuario();

      }, (error) => console.error(error),
        () => { })
  }


  handleChangePago(item: any) {
    this.checked = item.checked as boolean;
  }



  ListarDepartamentosUsuario() {
    this.departamentoService.ListarDepartamentosUsuario(this.authService.getEmailUser())
      .subscribe((reponse: Array<Departamento>) => {

        var listaCatagorias = [];

        reponse.forEach(x => {
          var item = new SelectModel();
          item.id = x.Id.toString();
          item.name = x.Nome;
          listaCatagorias.push(item);

        });

        this.listDepartamentos = listaCatagorias;

      }

      )
  }


}
