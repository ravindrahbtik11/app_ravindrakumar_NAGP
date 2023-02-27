import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginModel } from './login.model';


@Component({
    moduleId: module.id,
    selector: 'eca-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading: boolean;
    constructor(private authService: AuthService, private routes: Router) {
        this.model = new LoginModel();
    }
    ngOnInit() {
        this.authService.stopLoader();
        this.loading = false;
    }
    // Method use to login in application
    login() {
        this.loading = true;
        this.authService.startLoader();
        this.authService.login(this.model.username, this.model.password);
        // this.authService.login(this.model.username, this.model.password)
        //     .subscribe(
        //     data => {
        //         this.authService.stopLoader();
        //         this.loading = false;
        //         if (data) {
        //             this.routes.navigate(['/']);
        //         } else {
        //         }

        //     },
        //     error => {
        //         this.loading = false;
        //         this.authService.stopLoader();
        //     }
        //     );
     }
}
