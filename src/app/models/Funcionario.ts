export class Funcionario {
  Id: number;
  Nome: string;
  Matricula: string;
  DepartamentoId: number;
  Departamento: string;
  Mes: number;
  Ano: number;
  DiaFechamento: number;
  GerarCopiaFerias: boolean;

  NomePropriedade: string = '';
  mensagem: string = '';
  notificacoes: [];
}
