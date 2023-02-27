import { Component, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from './auth.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastMessageComponent } from './shared/components/toaster/toast-message.component';

@Component({
  selector: 'eca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eCommerce-Web';
  blockTemplate: LoaderComponent = LoaderComponent;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent;
  isLoggedIn:boolean;
  isLoader: boolean;
  subscription: any;
  constructor(private authService: AuthService){
    this.isLoggedIn = false;

    this.subscription = this.authService.loginEmitter.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

    if (this.authService.userInfo && this.authService.userInfo.isUserLoggedIn) {
      this.isLoggedIn = this.authService.userInfo.isUserLoggedIn;
    }
  }

}
