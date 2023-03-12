import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { AuthService } from '../../auth.service';
import { ProductService } from '../product.service';


@Component({
    moduleId: module.id,
    selector: 'eca-add-edit-product',
    templateUrl: './add-edit-product.component.html',
    styleUrls: ['./add-edit-product.component.css']
})

export class AddEditProductComponent implements OnInit {
    model: any;
    acceptType: string;
    brands: any;
    categoryies: any;
    allowFileType: any;
    uploadUrl: any;
    uploadType: any;
    fileName: string;
    constructor(private authService: AuthService, private routes: Router, private productService: ProductService) {
    }
    ngOnInit() {
        this.getProductDetail();
        this.uploadType = '';
        this.uploadUrl = 'https://localhost:44392/api/product/UploadFile';
        this.model = {};
        this.acceptType = '.jpeg,.png,.jpg';
        this.allowFileType = ['jpeg', 'png', 'jpg']
        this.model = {};
        this.categoryies = [];
        this.brands = [];
        let obj = { name: 'American Tourister', value: 'AmericanTourister' };
        this.brands.push(obj);
        obj = { name: 'Safari', value: 'Safari' };
        this.brands.push(obj);
        obj = { name: 'Skybags', value: 'Skybags' };
        this.brands.push(obj);
        obj = { name: `Levi's`, value: 'Levi' };
        this.brands.push(obj);
        obj = { name: 'Ben Martin', value: 'Ben Martin' };
        this.brands.push(obj);
        obj = { name: 'Diverse', value: 'Diverse' };
        this.brands.push(obj);


        let obj1 = { name: 'Type 1', value: 1 };
        this.categoryies.push(obj1);
        obj1 = { name: 'Type 2', value: 2 };
        this.categoryies.push(obj1);
        obj1 = { name: 'Type 3', value: 3 };
        this.categoryies.push(obj1);
        obj1 = { name: 'Type 4', value: 4 };
        this.categoryies.push(obj1);
        obj1 = { name: 'Type 5', value: 5 };
        this.categoryies.push(obj1);
    }

    uploadComplete(data: any) {

    }
    getProductDetail() {
        const url = AppSettings.Product;
        this.productService.getDetail(url).subscribe(response => {
            if (response) {
                console.log(response);
            }
        });
    }

    onFileSelected(event) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append(this.fileName, file);
            // this.model.formData = formData;
            this.uploadfile(formData);
        }
    }

    back() {
        this.routes.navigate(['/product']);
    }

    saveProductDetail(form: any) {
        this.authService.startLoader();
        const url = AppSettings.Product;
        this.productService.postData(url, this.model).subscribe(response => {
            this.authService.stopLoader();
            if (response) {
                this.authService.showSuccessMessage('Product added successfully');
                this.routes.navigate(['/product']);
            }
        })
    }

    uploadfile(data: any) {
        const url = AppSettings.UploadProduct;
        this.productService.postFileData(url, this.model).subscribe(response => {
            if (response) {

            }
        })
    }
}
