import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

import { SHARED_COMPONENTS } from './components';
import { SHARED_PIPES } from './pipes';
import { SHARED_DIRECTIVES } from './directives';
import { SHARED_PROVIDERS } from './services';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

const SHARED_MODULES: any[] = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatCardModule,
  MatToolbarModule,
  FileUploadModule
];

@NgModule({
  imports: [...SHARED_MODULES],

  declarations: [...SHARED_COMPONENTS, ...SHARED_PIPES, SHARED_DIRECTIVES],

  exports: [...SHARED_COMPONENTS, ...SHARED_PIPES,
  ...SHARED_MODULES, SHARED_DIRECTIVES],
  providers: []
})
export class SharedModule {

  static forRoot(configuredProviders: Array<any>): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...SHARED_PROVIDERS, ...configuredProviders]
    };
  }
}
