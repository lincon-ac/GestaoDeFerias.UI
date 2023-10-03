import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Ferias } from '../models/Ferias';

@Injectable({
  providedIn: 'root',
})
export class FeriasService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseURL = environment['endPoint'];

  AdicionarFerias(ferias: Ferias) {
    return this.httpClient.post<Ferias>(
      `${this.baseURL}/AdicionarFerias`,
      ferias
    );
  }

  AtualizarFerias(ferias: Ferias) {
    return this.httpClient.put<Ferias>(
      `${this.baseURL}/AtualizarFerias`,
      ferias
    );
  }

  ListarFeriasUsuario(emailUsuario: string) {
    return this.httpClient.get(
      `${this.baseURL}/ListarFeriasUsuario?emailUsuario=${emailUsuario}`
    );
  }

  ObterFerias(idFerias: number) {
    return this.httpClient.get<Ferias>(
      `${this.baseURL}/ObterFerias?id=${idFerias}`
    );
  }

  DeleteFerias(idFerias: number) {
    return this.httpClient.delete(
      `${this.baseURL}/DeleteFerias?id=${idFerias}`
    );
  }
}
