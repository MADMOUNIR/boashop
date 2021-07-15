import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService : UsersService) {}
//---permet d'injecter le token dans tous les requette http
  intercept(request: HttpRequest<any>, next: HttpHandler)
    {
      const token = this.userService.token;
      const newRequest = request.clone({headers : request.headers.set('Authorization' , 'Bearer '+token)});
      return next.handle(newRequest);
    }
}
