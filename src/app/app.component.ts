import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppSettings } from './app.settings';
import { AuthService } from './auth.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastMessageComponent } from './shared/components/toaster/toast-message.component';

@Component({
  selector: 'eca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  blockTemplate: LoaderComponent = LoaderComponent;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent;
  isLoggedIn: boolean;
  isLoader: boolean;
  subscription: any;
  subLoader: any;
  subpopUpMessage: any;
  subException: any;
  @ViewChild(ToastMessageComponent) ToastMessageComponent: ToastMessageComponent;
  modalHeading: string;
  modalContent: string;
  appJsInstance: any;
  selectedLanguageCode: string;
  constructor(private authService: AuthService) {
    this.isLoggedIn = false;

    this.subscription = this.authService.loginEmitter.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });

    if (this.authService.userInfo && this.authService.userInfo.isUserLoggedIn) {
      this.isLoggedIn = this.authService.userInfo.isUserLoggedIn;
    }
  }


  ngOnInit() {
    const self = this;
    this.subLoader = this.authService.loaderEmitter.subscribe((isLoaderSub: boolean) => {
      if (isLoaderSub) {
        this.blockUI.start();
      } else {
        this.blockUI.stop();
      }
    });
    this.loadConfigurations();
  }

  private loadConfigurations() {
    this.authService.getConfigurations(AppSettings.ConfigDataPath).
      subscribe(response => {
        this.authService.stopLoader();
        if (response && response.appConfig) {
          AppSettings.setAppConfig(response);
        }
      });
  }



}