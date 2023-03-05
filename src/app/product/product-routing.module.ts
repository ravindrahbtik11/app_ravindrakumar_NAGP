import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'product', component: ProductComponent },
      { path: 'addproduct', component: AddEditProductComponent },
      { path: 'editproduct', component: AddEditProductComponent },
    ])
  ],
  exports: [RouterModule]
})

// class represent the login routing module
export class ProductRoutingModule { }
