import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asocontrole } from './model/asocontrole';
import { environment as env } from '../../environments/environment.prod';

@Injectable()
export class AsocontroleService {

  constructor( private httpClient: HttpClient ) { }

  listar(): Observable<Asocontrole> {
    return this.httpClient.get<Asocontrole>(env.baseApiUrl + 'asocontrole');
  }
}
