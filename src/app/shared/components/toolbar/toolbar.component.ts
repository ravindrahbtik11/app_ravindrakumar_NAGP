import { Component, OnDestroy } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { AuthService } from 'src/app/auth.service';

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
  isLoggedIn: boolean;
  noOfCartItems: number;
  constructor(private authService: AuthService) {
    this.version = '';
    this.isLoggedIn = true;
    if (AppSettings !== null) {
      this.version = AppSettings.Version;
    }
    this.noOfCartItems = 0;
    this.subscription = this.authService.cartItems.subscribe((items: any) => {
      this.noOfCartItems = this.authService.selectedItems ? this.authService.selectedItems.length : 0;
    });

    if (this.authService.userInfo && this.authService.userInfo.isUserLoggedIn) {
      this.isLoggedIn = this.authService.userInfo.isUserLoggedIn;
    }


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

  logout() {
    this.isLoggedIn = false;
    this.authService.userInfo.isUserLoggedIn = false;
    this.authService.logout();
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
