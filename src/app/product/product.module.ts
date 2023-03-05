
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.modules';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';

@NgModule({
    imports: [SharedModule, ProductRoutingModule],
    declarations: [ProductComponent, AddEditProductComponent],
    providers: [ProductService]
})

// class represent Product module
export class ProductModule { }
