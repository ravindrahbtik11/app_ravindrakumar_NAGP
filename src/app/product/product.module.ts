
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.modules';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductService } from './product.service';

@NgModule({
    imports: [SharedModule, ProductRoutingModule],
    declarations: [ProductComponent],
    providers: [ProductService]
})

// class represent Product module
export class ProductModule { }
