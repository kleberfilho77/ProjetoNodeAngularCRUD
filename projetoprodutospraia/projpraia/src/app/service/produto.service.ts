import { Produto } from './../model/produto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL : string = 'http://localhost:3331/produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { 

  }

  public create(produto: Produto):Observable<Produto>{
    return this.http.post<Produto>(`${URL}`, produto);
  }

  public findAll(){
    return this.http.get<Produto[]>(`${URL}`);
  }

  public findByCode(vid: number){
    // return this.http.get<Produto>(`${URL}/${vid}`);
    return this.http.get<Produto>('http://localhost:3331/produto/' + vid);
  }

  public delete(vid: number){
    return this.http.delete<Produto>(`${URL}/${vid}`);
  }

  public update(vid: number, produto: Produto){
    return this.http.put<Produto>(`${URL}/${vid}`, produto);
  }

}
