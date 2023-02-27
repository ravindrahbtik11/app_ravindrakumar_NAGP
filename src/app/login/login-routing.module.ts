import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    //   { path: 'logout', component: LogoutComponent },
    ])
  ],
  exports: [RouterModule]
})

// class represent the login routing module
export class LoginRoutingModule { }
