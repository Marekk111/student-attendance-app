import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  uri: string = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post(this.uri + "/login",
      { username: this.username, password: this.password} )
      .subscribe(response => {
        console.log(response);
      });
  }


}
