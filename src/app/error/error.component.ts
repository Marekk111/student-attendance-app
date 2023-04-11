import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{
  constructor(private http: HttpClient, private loginService: LoginService) {

  }

  ngOnInit(): void {
    console.log(this.loginService.username);
  }



}
