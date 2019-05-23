import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clinica } from './model/clinica';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Clinica> {
    return this.httpClient.get<Clinica>(env.baseApiUrl + 'clinicas');

  }
}
