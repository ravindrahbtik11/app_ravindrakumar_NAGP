
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.modules';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
// class represent Login module
export class LoginModule { }
