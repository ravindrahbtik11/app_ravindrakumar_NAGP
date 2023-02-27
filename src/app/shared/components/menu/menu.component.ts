import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { MenuService } from '../../services/menu.service';
import { AuthService } from 'src/app/auth.service';
import { AppSettings } from 'src/app/app.settings';
import { HttpStatusCode } from '../../commons/enoms/http-status-code';

// declare var require: any;
// const initializer = require('../../../app.init.js');

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'eca-navbar',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  animations: [
    trigger('toggleState', [
      state('true', style({ right: '5px' })),
      state('false', style({ right: '-400px', display: 'none' })),
      state('normal', style({})),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ]),
  ]
})

export class MenuComponent implements OnInit, OnDestroy {
  menus: any[] = [];
  parentId: any;
  smallScreen: boolean;
  morlink: any;
  getInnerWidt: number;
  menuItems: any;
  subscription: any;
  @Input() items: any[];

  openMenu(event: any, level: string) {
    // this.appJsInstance.setMenuPosition(event, level);
  }

  closeMenu(event: any, level: string) {
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    //  if (this.getInnerWidt < 770 || this.getInnerWidt <= 1024) {
    if (iOS) {
      this.morlink = false;
    }
    // }
  }

  constructor(private menuService: MenuService, private authService: AuthService) {
    this.getInnerWidt = document.body.scrollWidth;
    this.checkhamburger();
    const getWindow = () => {
      return document.body.scrollWidth;
    };


    window.onresize = () => {
      this.getInnerWidt = getWindow();
      this.checkhamburger();
    };

    if (this.getInnerWidt >= 1300) {
      this.smallScreen = false;
      this.morlink = 'normal';
    }

    const iOS = navigator.platform.match(/i(Phone|Pod)/i);
    const mac = navigator.platform.match(/(Mac)/i) ? true : false;

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (mac || isMac) {
      this.smallScreen = false;
      this.morlink = 'normal';
      return;
    } else if (iOS) {
      this.smallScreen = true;
      return;
    }
  }

  ngOnInit() {
    // this.subscription = this.authService.menuLodaed.subscribe((val: any) => {
    //   this.menus = val;
    // });

    const self = this;
    setTimeout(() => {
      self.loadMenu();
    }, 1);
  }

  // Destroying subscription
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


  getChildItems(parentId: number) {
    const data = this.menus.filter((item: any) => item.parentId === parentId && parentId > 0);
    return data;
  }

  // Method use to show menu
  public showMenu() {
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    this.morlink = !this.morlink;
  }

  // Method use to checkhamburger
  public checkhamburger() {
    const iOScheck = navigator.platform.match(/i(Phone|Pod)/i);
    // !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    window.addEventListener('orientationchange', function () {
    }, false);

    const mac = navigator.platform.match(/(Mac)/i) ? true : false;

    //     var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
    // var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (mac || isMac) {
      this.smallScreen = false;
      this.morlink = 'normal';
      return;
    } else if (iOScheck) {
      this.smallScreen = true;
      return;
    }


    if (window.screen.availWidth < 1300) {
      this.smallScreen = true;
      this.morlink = 'normal';
    } else {
      this.smallScreen = false;
      this.morlink = 'normal';
    }
  }

  // Method use to load menu
  private loadMenu() {
    this.menus = [];
    if (!this.menuService.menus && !this.authService.menus) {
      this.menuService.getMenuDetail(AppSettings.MenuDataPath).
        subscribe(response => {
          this.authService.stopLoader();
          if (response && response.length > 0) {
            this.menus = response;
            this.menuService.menus = this.menus;
            this.authService.menus = this.menus;
          }
        });
    } else {
      this.menus = this.menuService.menus;
      this.menuService.menus = this.menus;
      this.authService.menus = this.menus;
    }
  }
}
