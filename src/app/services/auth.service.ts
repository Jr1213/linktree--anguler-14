import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl:string = `http://0.0.0.0:8000/api/`

  constructor(private _http:HttpClient) { }

  get(url:string):Observable<any> {
    return this._http.get(`${this.baseUrl}${url}`)
  }

  post(url:string, data:any):Observable<any> {
    return this._http.post(`${this.baseUrl}${url}`,data)
  }
}
