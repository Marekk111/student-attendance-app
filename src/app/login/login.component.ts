import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = "";
  password: string = "";


  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.getStringUser();
    this.loginService.getUserRoleString();
  }

  doLogin() {
    let resp= this.loginService.login(this.username, this.password);
    resp.subscribe(data =>{
      this.loginService.getStringUser();
      this.loginService.getUserRoleString();
      //console.log(this.loginService.username);
      this.router.navigate(["/subjects"]);
    })
  }
}
