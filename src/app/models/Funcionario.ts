export class Funcionario {
  Id: number;
  Nome: string;
  Matricula: string;
  Departamento: string;
  Mes: number;
  Ano: number;
  DiaFechamento: number;
  GerarCopiaFerias: boolean;
  MesCopia: number;
  AnoCopia: number;

  NomePropriedade: string = '';
  mensagem: string = '';
  notificacoes: [];
}
