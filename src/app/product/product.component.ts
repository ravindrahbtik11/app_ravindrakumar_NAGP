import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
    moduleId: module.id,
    selector: 'eca-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    constructor(private authService: AuthService, private routes: Router) {
    }
    ngOnInit() {
    }

}
