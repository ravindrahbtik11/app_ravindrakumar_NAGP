import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
import { AuthService } from '../auth.service';
import { ProductService } from './product.service';
import { AccountService } from '../login/account.service';
import { Account } from '../login/account';


@Component({
    moduleId: module.id,
    selector: 'eca-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    productList: any;
    selectedProduct: any;
    sizes: any;
    brands: any;
    colors: any;
    filterModel: ProductFilterModel;
    account!: Account;
    constructor(private authService: AuthService, private routes: Router,
        private productService: ProductService,
        private accountService: AccountService) {
    }
    ngOnInit() {
        this.filterModel = new ProductFilterModel();
        this.selectedProduct = [];
        this.productList = [];
        this.accountService.getAccount()
            .subscribe(x => {
                this.account = x
            });

        if (this.productService.productFilter) {
            this.filterModel = this.productService.productFilter;
            this.productService.productFilter = null;
        }
        if (this.productService && !this.productService.productList) {
            this.getProductDetail();
        } else {
            this.productList = this.productService.productList;
            this.productService.productList = null;
        }

        this.loadInitialFilterData();

    }

    getDetail(id: any) {
        this.productService.productFilter = this.filterModel;
        this.routes.navigate(['/productdetail', id]);
    }



    addProduct() {
        this.routes.navigate(['/productdetail']);
    }

    getProductDetail() {
        let url = AppSettings.Product;
        this.filterModel.Size = this.filterModel.Size ? this.filterModel.Size : '';
        this.filterModel.brand = this.filterModel.brand ? this.filterModel.brand : '';
        this.filterModel.Color = this.filterModel.Color ? this.filterModel.Color : '';
        this.filterModel.filter = this.filterModel.filter ? this.filterModel.filter : '';
        url = url + '?size=' + this.filterModel.Size + '&brand=' + this.filterModel.brand + '&color=' + this.filterModel.Color + '&name=' + this.filterModel.filter;
        this.productList = [];
        this.authService.startLoader();
        this.productService.getDetail(url + '&access_token=' + this.accountService.accountValue?.token).subscribe(response => {
            this.authService.stopLoader();
            if (response && response.length > 1 || (response.length === 1 && response[0])) {
                this.productList = response;
            }
        });
    }

    addToCart(product: any) {
        this.authService.selectedItems = this.authService.selectedItems &&
            this.authService.selectedItems.length > 0 ? this.authService.selectedItems : [];
        this.authService.selectedItems.push(product);
        this.authService.cartItems.emit(this.authService.selectedItems.length);
    }


    private loadInitialFilterData() {
        this.sizes = [];
        let obj = { name: 'Larg', value: 'Larg' }
        this.sizes.push(obj);
        obj = { name: 'Medium', value: 'Medium' }
        this.sizes.push(obj);
        obj = { name: 'Small', value: 'Small' }
        this.sizes.push(obj);
        obj = { name: 'XSmall', value: 'XSmall' }
        this.sizes.push(obj);
        obj = { name: 'XL', value: 'XL' }
        obj = { name: 'XXL', value: 'XXL' }
        this.sizes.push(obj);
        obj = { name: `FreeSize`, value: 'FreeSize' }
        this.sizes.push(obj);
        this.brands = [];
        obj = { name: `Levi's`, value: 'Levi' }
        this.brands.push(obj);
        obj = { name: `Adidas`, value: 'Adidas' }
        this.brands.push(obj);
        obj = { name: `Ben Martin`, value: 'BenMartin' }
        this.brands.push(obj);
        obj = { name: `Peter England`, value: 'PeterEngland' }
        this.brands.push(obj);
        obj = { name: `Spykar`, value: 'Spykar' }
        this.brands.push(obj);
        obj = { name: `Common`, value: 'Common' }
        this.brands.push(obj);

        this.colors = [];
        obj = { name: `Red`, value: 'Red' }
        this.colors.push(obj);
        obj = { name: `Blue`, value: 'Blue' }
        this.colors.push(obj);
        obj = { name: `Dark Blue`, value: 'DarkBlue' }
        this.colors.push(obj);
        obj = { name: `Green`, value: 'Green' }
        this.colors.push(obj);
        obj = { name: `Yellow`, value: 'Yellow' }
        this.colors.push(obj);
        obj = { name: `Other`, value: 'Other' }
        this.colors.push(obj);
    }

}

export class ProductFilterModel {
    brand: string;
    Size: string;
    Color: string;
    filter: string;
}
