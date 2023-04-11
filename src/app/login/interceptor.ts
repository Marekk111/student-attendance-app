import {Injectable} from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from "./login.service";
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('AuthString') || '';
    request = request.clone({
      setHeaders: {
        Authorization: authToken
      }
    })
    return next.handle(request);
  }
}
