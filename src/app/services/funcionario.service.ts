import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Funcionario } from '../models/Funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseURL = environment['endPoint'];

  AdicionarFuncionario(Funcionario: Funcionario) {
    return this.httpClient.post<Funcionario>(
      `${this.baseURL}/AdicionarFuncionarioFinanceiro`,
      Funcionario
    );
  }

  AtualizarFuncionario(Funcionario: Funcionario) {
    return this.httpClient.put<Funcionario>(
      `${this.baseURL}/AtualizarFuncionarioFinanceiro`,
      Funcionario
    );
  }

  ListaFuncionariosUsuario(emailUsuario: string) {
    return this.httpClient.get(
      `${this.baseURL}/ListaFuncionariosUsuario?emailUsuario=${emailUsuario}`
    );
  }

  CadastrarUsuarioNoFuncionario(idFuncionario: number, emailUsuario: string) {
    return this.httpClient.post<any>(
      `${this.baseURL}/CadastrarUsuarioNoFuncionario?idFuncionario=${idFuncionario}&emailUsuario=${emailUsuario}`,
      null
    );
  }

  ObterFuncionario(idFuncionario: number) {
    return this.httpClient.get<Funcionario>(
      `${this.baseURL}/ObterFuncionarioFinanceiro?id=${idFuncionario}`
    );
  }
}
