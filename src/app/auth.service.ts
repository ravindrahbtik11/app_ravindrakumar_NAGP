import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from './app.settings';
import { LoginModel } from './login/login.model';

@Injectable()

// Class represent Auth service
export class AuthService {
    hasPermission(hideifunauthorized: any) {
        throw new Error('Method not implemented.');
    }
    public userInfo: LoginModel;
    public loginEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public loaderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public selectedLanguageCodeChange: EventEmitter<string> = new EventEmitter<string>();
    public menuLodaed: EventEmitter<any> = new EventEmitter<any>();
    public currentPath: string;
    public menus: any;
    errorMessage: any;
    constructor(private routes: Router, private http: HttpClient) {
        this.userInfo = new LoginModel();
        this.currentPath = window.location.pathname;
        this.redirectUser();
    }

    // Method use to login in application
    public login(userName: string, password: string) {
        this.loginEmitter.emit(true);
        return true;
    }

    // Method use to logout from application
    public logout() {
        this.startLoader();
        sessionStorage.clear();
        this.userInfo =  new LoginModel();
        localStorage.clear();
        this.loginEmitter.emit(false);
        const domainUrl = window.location.origin;
        let time: number;
        time = 100;
        // const url = domainUrl + '/Shibboleth.sso/Logout?return=' + domainUrl;
        const url = domainUrl + '/saml/logout?ReturnTo=' + domainUrl;
        setTimeout(() => {
            window.location.href = url;
        }, time);
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

    // getQueryStringValue(key) {
    //     return decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' +
    //         encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
    // }

    directLogin() {
        this.startLoader();
        // if (AppSettings && AppSettings.Users && AppSettings.Users.length > 0) {
        //     this.userInfo.gid = AppSettings.Users[0].gid;
        //     this.validateUser(this.userInfo.gid);
        // } else {
        //     this.redirectCustomError();
        // }

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


    // Method use to get temporary locations
    private validateUser(gidCode: string) {
        this.startLoader();
        // this.getUserDetailUser(gidCode).subscribe(response => {
        //     this.stopLoader();
        //     if (response) {
        //         if (response.headers) {
        //             this.userInfo.accessToken = response.headers.get('x-xsrf-token');
        //             this.userInfo.accessHeader = response.headers.get('x-xsrf-token');
        //         }
        //         response = response.body;
        //         if (response.errorCode === HttpStatusCode.Ok.toString() &&
        //             response.dataList && response.dataList.length > 0) {
        //             this.userInfo.userRole = response.dataList[0].role ? response.dataList[0].role : [];
        //             this.userInfo.displayName = response.dataList[0].lastName + ', ' + response.dataList[0].name;
        //             this.userInfo.firstName = response.dataList[0].name;
        //             this.userInfo.lastName = response.dataList[0].lastName;
        //             this.userInfo.displayNameForCSV = response.dataList[0].lastName + ' ' + response.dataList[0].name;
        //             this.userInfo.userName = response.dataList[0].lastName + ',' + response.dataList[0].name;
        //             this.userInfo.operatorId = response.dataList[0].operatorId;
        //             this.userInfo.email = response.dataList[0].email;
        //             this.userInfo.isUserLoggedIn = true;

        //             this.userInfo.permissionsDetail = response.dataList[0].roleTofunctionalityList ?
        //                 response.dataList[0].roleTofunctionalityList : [];
        //             this.loginEmitter.emit(this.userInfo.isUserLoggedIn);
        //             this.menus = response.dataList[0].menuListPerRoleDTO ? response.dataList[0].menuListPerRoleDTO : [];
        //             this.redirect();
        //             // this.menuLodaed.emit(this.menus);
        //             // this.setRedirectionPath(this.menus, this.currentPath);
        //         } else {
        //             this.redirectCustomError();
        //         }
        //     }

        // });
    }

    public redirectCustomError(message: any = '') {
        const self = this;
        self.errorMessage = message ? message : 'You are not authorized! Please contact system administrator.';
        setTimeout(() => {
            this.userInfo.isUserLoggedIn = false;
            this.loginEmitter.emit(this.userInfo.isUserLoggedIn);
            self.routes.navigate(['/error']);
            this.userInfo =  new LoginModel();
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


    // // Method use to get validate user
    // private getUserDetailUser(gidCode: string): Observable<any> {
    //     let headers = new HttpHeaders();
    //     headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    //     headers = headers.append('filter', gidCode);
    //     headers = headers.append('gid', gidCode);
    //     headers = headers.append('authorization', 'Basic ' + btoa(gidCode + ': '));
    //     headers = headers.append('Pragma', 'no-cache');
    //     headers = headers.append('Cache-Control', 'no-cache');
    //     headers = headers.append('Cache-Control', 'no-store, no-cache, must-revalidate');
    //     // const options = {
    //     //     headers: headers,
    //     // };
    //     const url = AppSettings.validateUserDetail;
    //     return this.http.get(url, { headers: headers, observe: 'response' }).pipe(response => {
    //         return response;
    //     });
    // }

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
