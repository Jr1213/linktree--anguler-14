import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorgeService {

  constructor() { }


  setToken(token:string):void {
    localStorage.setItem('token',token)
  }

  getToken():string | null {
     return localStorage.getItem('token')
  }

  //logout 
  deleteToken():void {
    localStorage.clear()
  }
}
