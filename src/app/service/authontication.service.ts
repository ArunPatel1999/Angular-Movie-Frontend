import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable, Subject, BehaviorSubject, of } from "rxjs";
import { map } from "rxjs/operators";


const BACKEND_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthonticationService {

  public isAuthenticated: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public getLoginStatus():Observable<boolean> {
    if (localStorage.getItem("jwtToken") != null) {
      var headers = {"Authorization": "Bearer " + localStorage.getItem("jwtToken") };
      return this.httpClient.get<boolean>(BACKEND_URL+"/authontication/loginStatus", {headers: headers});
    } else
      return of(false);
  }

  public loginFuncation(username:string,password:string) : Observable<any> {
    return this.httpClient.get<any>(BACKEND_URL+"/authontication/getToken/"+username+"/"+password);
  }


  public logoutFuncation() {
    localStorage.removeItem("jwtToken");
    this.isAuthenticated.next(false);
  }
}
