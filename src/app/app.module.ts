import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';

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
import { HomeModule } from './home/home.module';

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
    UserModule,
    HomeModule
  ],
  exports: [ToastMessageComponent, LoaderComponent, ContentComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
