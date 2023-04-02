import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductComponent },
      { path: 'productdetail/:id', component: ProductDetailComponent },
      { path: 'editproduct', component: AddEditProductComponent },
    ])
  ],
  exports: [RouterModule]
})

// class represent the login routing module
export class ProductRoutingModule { }
