import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { FuncionarioFinanceiro } from '../models/FuncionarioFinanceiro';


@Injectable({
    providedIn: 'root'
})

export class Funcionarioservice {

    constructor(private httpClient: HttpClient) {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarFuncionarioFinanceiro(funcionarioFinanceiro: FuncionarioFinanceiro) {
        return this.httpClient.post<FuncionarioFinanceiro>(`${this.baseURL}/AdicionarFuncionarioFinanceiro`,
            funcionarioFinanceiro)
    }

    ListaFuncionariosUsuario(emailUsuario: string) {
        return this.httpClient.get(`${this.baseURL}/ListaFuncionariosUsuario?emailUsuario=${emailUsuario}`);
    }

    CadastrarUsuarioNoFuncionario(idFuncionario: number, emailUsuario: string) {
        return this.httpClient.post<any>(`${this.baseURL}/CadastrarUsuarioNoFuncionario?idFuncionario=${idFuncionario}&emailUsuario=${emailUsuario}`, null)
    }


}
