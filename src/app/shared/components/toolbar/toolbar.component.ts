import { Component, OnDestroy } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';

/**
 * This class represents the Toolbar component.
 */

@Component({
  moduleId: module.id,
  selector: 'eca-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [
    'toolbar.component.css',
  ],
})

export class ToolbarComponent implements OnDestroy {
  isuserdrpdwn: boolean;
  subscription: any;
  getInnerWidt: number;
  version: string;
  isLoggedIn:boolean;
  constructor() {
    this.version = '';
    this.isLoggedIn = true;
    if (AppSettings !== null) {
      this.version = AppSettings.Version;
    }
    // this.subscription = this.authService.loginEmitter.subscribe((val: boolean) => {
    //   this.isLoggedIn = val;
    // });

    // if (this.authService.userInfo && this.authService.userInfo.isUserLoggedIn) {
    //   this.isLoggedIn = this.authService.userInfo.isUserLoggedIn;
    // }


    this.getInnerWidt = (window.screen.width);
    this.checkhamburger();
    const getWindow = () => {
      return window.innerWidth;
    };

    window.onresize = () => {
      this.getInnerWidt = getWindow();
      this.checkhamburger();
    };
    this.isuserdrpdwn = true;

  }

  // Method to handle destroy life cycle hooks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Method use to show user details
  public showUserDetails() {
    this.isuserdrpdwn = !this.isuserdrpdwn;
  }

  // method to check hamburger
  public checkhamburger() {
    if (this.getInnerWidt < 770) {
      this.isuserdrpdwn = false;
    } else {
      this.isuserdrpdwn = true;
    }
  }
}
