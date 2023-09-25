export class Ferias {
    Id: number;
    Nome: string;
    Valor: number;
    Mes: number;
    Ano: number;
    TipoFerias: number;
    DataCadastro: Date;
    DataAlteracao: Date;
    DataPagamento: Date;
    DataVencimento: Date;
    Pago: boolean;
    FeriasAtrasada: boolean;
    IdDepartamento: number;

    NomePropriedade: string = "";
    mensagem: string = "";
    notificacoes: [];
}
