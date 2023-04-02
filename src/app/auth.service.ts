import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastMesssageType } from '../app/shared/components/toaster/toast-message-type';

import { AppSettings } from './app.settings';
import { LoginModel } from './login/login.model';
import { ECAHttpService } from './shared/services';
import { AccountService } from './login/account.service';

@Injectable()

// Class represent Auth service
export class AuthService {
    toastMessage: ToastMessage;
    public userInfo: LoginModel;
    public popUpMessage: EventEmitter<ToastMessage> = new EventEmitter<ToastMessage>();
    public loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public cartItems: EventEmitter<any> = new EventEmitter<any>();
    public selectedItems: any;
    public loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public selectedLanguageCodeChange: EventEmitter<string> = new EventEmitter<string>();
    public menuLodaed: EventEmitter<any> = new EventEmitter<any>();
    public currentPath: string;
    public menus: any;
    errorMessage: any;
    constructor(private routes: Router, private http: ECAHttpService,
        private accountService: AccountService) {
        this.userInfo = new LoginModel();
        this.currentPath = window.location.pathname;
        this.redirectUser();
    }

    // Method use to login in application
    public login(userName: string, password: string) {
        this.loginEmitter.emit(true);
        this.userInfo.isUserLoggedIn = true;
    }

    // Method use to logout from application
    public logout() {
        this.startLoader();
        sessionStorage.clear();
        this.userInfo = new LoginModel();
        localStorage.clear();
        this.loginEmitter.emit(false);
        this.accountService.logout();
        this.routes.navigate(['/']);
    }

    hasPermission(hideifunauthorized: any) {
        throw new Error('Method not implemented.');
    }

    // Method use to redirect on login page
    public redirectUser() {
        if (this.userInfo && !this.userInfo.isUserLoggedIn) {
            try {
                this.startLoader();
                this.directLogin();
            } catch (ex) {

            }

        }
    }

    directLogin() {
        this.startLoader();
        // if (AppSettings && AppSettings.Users && AppSettings.Users.length > 0) {
        //     this.userInfo.gid = AppSettings.Users[0].gid;
        //     this.validateUser(this.userInfo.gid);
        // } else {
        //     this.redirectCustomError();
        // }

    }

    // Method use to show success message
    public showSuccessMessage(message: string) {
        if (message) {
            this.toastMessage = new ToastMessage();
            this.toastMessage.message = message;
            this.toastMessage.toasType = ToastMesssageType.Success;
            this.popUpMessage.emit(this.toastMessage);
        }
    }

    // Method use to show warning message
    public showWarningMessage(message: string) {
        if (message) {
            this.toastMessage = new ToastMessage();
            this.toastMessage.message = message;
            this.toastMessage.toasType = ToastMesssageType.Warning;
            this.popUpMessage.emit(this.toastMessage);
        }
    }  

    // Method use to show error message
    public showErrorMessage(message: string) {
        if (message) {
            this.toastMessage = new ToastMessage();
            this.toastMessage.message = message;
            this.toastMessage.toasType = ToastMesssageType.Error;
            this.popUpMessage.emit(this.toastMessage);
        }

    }


    public getConfigurations(url: string): Observable<any> {
        return this.http.get(url)
        .pipe((response) => {
            return response;
        });
    }

    // Method use to start loader Z003W2UX Z003W2TU(H) Z00W2UX z003ufcc
    public startLoader() {
        this.loaderEmitter.emit(true);
    }

    // Method use to stop loader
    public stopLoader() {
        this.loaderEmitter.emit(false);
    }


    public isAssignedUserLoggedIn(assignedUser: string) {
        let isSameUser: boolean;
        isSameUser = true;
        if (this.userInfo && this.userInfo.userRole && this.userInfo.userRole.length > 0) {
            if (this.userInfo.userRole.length === 1) {
                isSameUser = this.userInfo.email === assignedUser;
            }
        }
        return isSameUser;
    }

    public redirectCustomError(message: any = '') {
        const self = this;
        self.errorMessage = message ? message : 'You are not authorized! Please contact system administrator.';
        setTimeout(() => {
            this.userInfo.isUserLoggedIn = false;
            this.loginEmitter.emit(this.userInfo.isUserLoggedIn);
            self.routes.navigate(['/error']);
            this.userInfo = new LoginModel();
            self.stopLoader();
        }, 1000);
    }

    public refreshLoginData() {
        window.location.reload();
        // this.redirect();
        // this.validateUser(this.userInfo.gid);
    }

    // Method use to redirect on refresh
    private redirect() {
        if (this.userInfo.isUserLoggedIn) {
            let url = window.location.href;

            const self = this;
            setTimeout(() => {
                self.menuLodaed.emit(self.menus);
            }, 100);

            this.setRedirectionPath(this.menus, this.currentPath);

        }
    }

    // Method use to set redirection path
    private setRedirectionPath(menus: any, currentPath: string) {
        let curPath: string;
        curPath = '/';
        // menus.forEach(element: any => {
        //     if (currentPath === element.route) {
        //         curPath = element.route;
        //     }
        // });
        this.routes.navigate([curPath]);
    }

    getHeaders(response: any) {
        if (!response) {
            return;
        }
        const data = response.body;
        response.headers.keys().map((key: any) => {
            if (key === 'X-XSRF-TOKEN') {
                data.tkn = response.headers.get(key);
            }
        });

        return data;
    }

}

export class ToastMessage {
    message: string;
    toasType: ToastMesssageType;
}

