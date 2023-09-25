import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioFinanceiro } from 'src/app/models/FuncionarioFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { Funcionarioservice } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent {

  tipoTela: number = 1;// 1 listagem, 2 cadastro, 3 edição
  tableListFuncionarios: Array<FuncionarioFinanceiro>;
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
    this.funcionarioForm.reset();
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


  ListaFuncionariosUsuario() {
    this.tipoTela = 1;

    this.funcionarioservice.ListaFuncionariosUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<FuncionarioFinanceiro>) => {

        this.tableListFuncionarios = response;

      }, (error) => console.error(error),
        () => { })

  }

  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public funcionarioservice: Funcionarioservice, public authService: AuthService) {
  }

  funcionarioForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaFuncionariosUsuario();

    this.funcionarioForm = this.formBuilder.group
      (
        {
          name: ['', [Validators.required]]
        }
      )
  }


  dadorForm() {
    return this.funcionarioForm.controls;
  }

  enviar() {
    debugger
    var dados = this.dadorForm();

    let item = new FuncionarioFinanceiro();
    item.Nome = dados["name"].value;

    item.Id = 0;
    item.Mes = 0;
    item.Ano = 0;
    item.DiaFechamento = 0;
    item.GerarCopiaFerias = true;
    item.MesCopia = 0;
    item.AnoCopia = 0;

    this.funcionarioservice.AdicionarFuncionarioFinanceiro(item)
      .subscribe((response: FuncionarioFinanceiro) => {

        this.funcionarioForm.reset();



        this.funcionarioservice.CadastrarUsuarioNoFuncionario(response.Id, this.authService.getEmailUser())
          .subscribe((response: any) => {

            this.ListaFuncionariosUsuario();

          }, (error) => console.error(error),
            () => { })

      }, (error) => console.error(error),
        () => { })


  }



}
