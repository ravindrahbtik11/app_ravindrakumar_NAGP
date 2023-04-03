import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginModel } from './login.model';
import { AccountService } from './account.service';
import { Account } from './account';
import { AppSettings } from '../app.settings';
import { ProductService } from '../product/product.service';


@Component({
    moduleId: module.id,
    selector: 'eca-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading: boolean;
    account!: Account;
    filterModel: any;
    constructor(private authService: AuthService, private routes: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private accountService: AccountService) {
        this.model = new LoginModel();
    }
    ngOnInit() {
        this.loading = false;
    }
    // Method use to login in application
    login() {
        // this.authService.login(this.model.username, this.model.password);
        this.getProductDetail();

    }

    getProductDetail() {
        let url = AppSettings.Product;
        this.filterModel = {};
        this.filterModel.Size = this.filterModel.Size ? this.filterModel.Size : '';
        this.filterModel.brand = this.filterModel.brand ? this.filterModel.brand : '';
        this.filterModel.Color = this.filterModel.Color ? this.filterModel.Color : '';
        this.filterModel.filter = this.filterModel.filter ? this.filterModel.filter : '';
        url = url + '?size=' + this.filterModel.Size + '&brand=' + this.filterModel.brand + '&color=' + this.filterModel.Color + '&name=' + this.filterModel.filter;
        const token  = this.accountService.accountValue?.token ?  this.accountService.accountValue?.token : '';
        this.authService.startLoader(); // + '&access_token=' + token
        this.productService.getDetail(url).subscribe(response => {
            this.authService.stopLoader();
            if (response && response.length > 1 || (response.length === 1 && response[0])) {
                this.productService.productList = response;
                this.authService.loginEmitter.emit(true);
            }
        });
    }

    logoutWithFacebook() {
        this.accountService.logout();
    }

    loginWithFacebook() {
        this.accountService.login()
            .subscribe(() => {
                // get return url from query parameters or default to home page
                // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                // this.routes.navigateByUrl(returnUrl);
                this.authService.loginEmitter.emit(true);
            });
    }
}
