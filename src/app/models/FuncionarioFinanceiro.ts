export class FuncionarioFinanceiro {
  Id: number;
  Nome: string;
  Matricula: string;
  Mes: number;
  Ano: number;
  DiaFechamento: number;
  GerarCopiaFerias: boolean;
  MesCopia: number;
  AnoCopia: number;

  NomePropriedade: string = "";
  mensagem: string = "";
  notificacoes: [];
}
