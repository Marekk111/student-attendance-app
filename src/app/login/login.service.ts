import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environments';
import {User} from "./user";
import {map, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import * as stream from "stream";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;
  public authString: string = "";

  public username: string = "";
  public userRole: string = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(username: string, password: string) {
    this.authString = 'Basic '+btoa(username + ":" + password);
    localStorage.setItem('AuthString', this.authString);
    return this.http.get(`${this.apiServerUrl}/auth/login`, {responseType: 'text' as 'json'});
  }



  public logout() {
    this.authString = "";
    localStorage.setItem('AuthString', "");
    this.getStringUser();
    this.getUserRoleString();
    this.router.navigate(["/login"]);
  }

  public getLoggedInUser(): Observable<string> {
    return this.http.get(`${this.apiServerUrl}/auth/getPrincipal`, {responseType: 'text' });
  }

  public getStringUser(): void {
    this.getLoggedInUser().subscribe((result) => {
      this.username = result;
    })
  }

  public getUserRole(): Observable<string> {
    return this.http.get(`${this.apiServerUrl}/auth/getRole`, {responseType: 'text'});
  }

  public getUserRoleString(): void {
    this.getUserRole().subscribe((result) => {
      this.userRole = result;
    })
  }

  /*public outputRoleToConsole(): void {
    this.getStringUser();
    this.getUserRoleString();
    console.log(this.username);
    console.log(this.userRole);
  }*/
}
