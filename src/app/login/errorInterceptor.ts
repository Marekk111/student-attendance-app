import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loginService : LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && this.loginService.username == 'anonymousUser') {
        // auto logout if 401 response returned from api
        this.loginService.logout();
      } else if (err.status == 403) {
        this.router.navigate(["/error"]);
      } else if (err.status === 401 && this.loginService.username != 'anonymousUser') {
      }

      const error = err.error;
      return throwError(error);
    }))
  }
}
