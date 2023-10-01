import { Funcionario } from './Funcionario';

export class Ferias {
  Id: number;
  Nome: string;
  Mes: number;
  Ano: number;
  TipoFerias: number;
  DataCadastro: Date;
  DataAlteracao: Date;
  DataPagamento: Date;
  DataVencimento: Date;
  DataInicio: Date;
  DataEncerramento: Date;
  Pago: boolean;
  FeriasAtrasada: boolean;
  IdDepartamento: number;
  funcionario: Funcionario;
  FuncionarioId: number;

  NomePropriedade: string = '';
  mensagem: string = '';
  notificacoes: [];
}
