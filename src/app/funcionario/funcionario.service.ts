import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from './model/funcionario';
import { environment as env } from '../../environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class FuncionarioService {

  constructor( private httpClient: HttpClient ) { }

  listar(nome: string, sit: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/' + nome + '/' + sit);
  }

  salvar(funcionario: Funcionario): Observable<any> {
    return this.httpClient.post<any>(env.baseApiUrl + 'funcionarios/salvar', funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<any> {
    console.log(funcionario);
    return this.httpClient.put<any>(env.baseApiUrl + 'funcionarios/atualizar', funcionario);
  }

  getFuncionarioId(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/id/' +  id);
  }

  getFuncionarioCPF(cpf: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/cpf/' +  cpf);
  }

  getFuncionarioFuncao(id: number, nome: string, situacao: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/funcao/' +  id + '/' + nome + '/' + situacao);
  }

  getFuncionarioLoja(id: number, nome: string, situacao: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/loja/' +  id + '/' + nome + '/' + situacao);
  }

  getFuncionarioFuncaoLoja(idloja: number, idfuncao: number, nome: string, situacao: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(env.baseApiUrl + 'funcionarios/' + idloja + '/' + idfuncao + '/' + nome + '/' + situacao);
  }
}
