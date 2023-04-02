import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.modules';
import { ToastMessageComponent } from './shared/components/toaster/toast-message.component';
import { ContentComponent } from './shared/components/content/content.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoginModule } from './login/login.module';
import { AuthService } from './auth.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CustomDateAdapter, MY_DATE_FORMATS } from './shared/commons/custom-date-adopter';
import { AccountService } from './login/account.service';
import { appInitializer } from './app.initializer';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToastMessageComponent,
    ContentComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    ToasterModule.forRoot(),
    SharedModule.forRoot([]),
    LoginModule,
    ProductModule,
    UserModule
  ],
  exports: [ToastMessageComponent, LoaderComponent, ContentComponent],
  providers: [AuthService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
