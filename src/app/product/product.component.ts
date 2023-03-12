import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from '../app.settings';
import { AuthService } from '../auth.service';
import { ProductService } from './product.service';


@Component({
    moduleId: module.id,
    selector: 'eca-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    productList: any;
    selectedProduct: any;
    constructor(private authService: AuthService, private routes: Router, private productService: ProductService) {
    }
    ngOnInit() {
        this.selectedProduct = [];
        this.productList = [];
        // let obj = {
        //     productName: 'Jeans',
        //     price: '1200',
        //     description: 'Super slim and comfertable and strachible jeans',
        //     url: 'https://www.w3schools.com/w3images/jeans3.jpg'
        // }
        // this.productList.push(obj);

        // obj = {
        //     productName: 'Jeans',
        //     price: '1200',
        //     description: 'Super slim and comfertable and strachible jeans',
        //     url: 'https://www.w3schools.com/w3images/jeans3.jpg'
        // }
        // this.productList.push(obj);

        // obj = {
        //     productName: 'Jeans',
        //     price: '1300',
        //     description: 'Super slim and comfertable and strachible jeans',
        //     url: 'https://www.w3schools.com/w3images/jeans3.jpg'
        // }
        // this.productList.push(obj);

        // obj = {
        //     productName: 'Jeans',
        //     price: '1400',
        //     description: 'Super slim and comfertable and strachible jeans',
        //     url: 'https://www.w3schools.com/w3images/jeans3.jpg'
        // }
        // this.productList.push(obj);

        // obj = {
        //     productName: 'Jeans',
        //     price: '1500',
        //     description: 'Super slim and comfertable and strachible jeans',
        //     url: 'https://www.w3schools.com/w3images/jeans3.jpg'
        // }
        // this.productList.push(obj);
        this. getProductDetail();
    }

    addProduct() {
        this.routes.navigate(['/addproduct']);
    }

    getProductDetail() {
        const url = AppSettings.Product;
        this.productService.getDetail(url).subscribe(response => {
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

}
