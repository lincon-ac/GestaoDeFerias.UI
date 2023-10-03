import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseURL = environment['endPoint'];

  AdicionarDepartamento(departamento: Departamento) {
    return this.httpClient.post<Departamento>(
      `${this.baseURL}/AdicionarDepartamento`,
      departamento
    );
  }

  AtualizarDepartamento(departamento: Departamento) {
    return this.httpClient.put<Departamento>(
      `${this.baseURL}/AtualizarDepartamento`,
      departamento
    );
  }

  ListarDepartamentosUsuario(emailUsuario: string) {
    return this.httpClient.get(
      `${this.baseURL}/ListarDepartamentosUsuario?emailUsuario=${emailUsuario}`
    );
  }

  ObterDepartamento(departamentoId: number) {
    return this.httpClient.get<Departamento>(
      `${this.baseURL}/ObterDepartamento?id=${departamentoId}`
    );
  }

  DeleteDepartamento(departamentoId: number) {
    return this.httpClient.delete(
      `${this.baseURL}/DeleteDepartamento?id=${departamentoId}`
    );
  }
}
