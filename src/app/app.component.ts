import {Component} from '@angular/core';
import {LoginService} from "./login/login.service";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public loginService: LoginService) {
    if (this.loginService.authString == "") {
      this.loginService.authString = localStorage.getItem("authString") || "";
    }

  }

  logout() {
    this.loginService.logout();
    console.log(this.loginService.getLoggedInUser());
  }
}
