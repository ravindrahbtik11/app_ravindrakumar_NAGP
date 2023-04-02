import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { AuthService } from '../../auth.service';
import { ProductService } from '../product.service';


@Component({
    moduleId: module.id,
    selector: 'eca-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
    product: any;
    filterModel: any;

    constructor(private authService: AuthService, private routes: Router,
        private productService: ProductService, private activatedroute: ActivatedRoute) {
    }
    ngOnInit() {
        this.product = {};
        this.activatedroute.params.subscribe(params => {
            const id = params['id'];
            this.filterModel = this.productService.productFilter;
            this.productService.productFilter = null;
            this.getDetail(id);
        });


    }

    getDetail(id: any) {
        this.product = {};
        let url = AppSettings.Product;
        url = url + '/' + id;
        this.authService.startLoader();
        this.productService.getDetail(url).subscribe(response => {
            this.authService.stopLoader();
            if (response) {
                this.product = response;
            }
        });
    }


    back() {
        this.productService.productFilter = this.filterModel;
        this.routes.navigate(['/']);
    }

    addToCart(product: any) {
        this.authService.selectedItems = this.authService.selectedItems &&
            this.authService.selectedItems.length > 0 ? this.authService.selectedItems : [];
        this.authService.selectedItems.push(product);
        this.authService.cartItems.emit(this.authService.selectedItems.length);
    }
}