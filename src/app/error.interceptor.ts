import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './login/account.service';
import { AuthService } from './auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.authService.stopLoader();
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }

            if(err.status === 401){
                this.authService.showErrorMessage('You are not Authorize to access resources.');
            }

            const error = err.error?.message || err.statusText;
            console.log(err);
            return throwError(() => error);
        }))
    }
}