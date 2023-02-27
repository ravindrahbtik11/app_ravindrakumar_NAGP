import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from 'angular2-toaster/lib/toast.component';
import { AppModule } from 'src/app/app.module';
import { ToastMessageComponent } from './toast-message.component';

describe('Toast Message - Component', () => {
    let fixture: ComponentFixture<ToastMessageComponent>;
    let component;
   beforeEach(()=> {
     TestBed.configureTestingModule({
        imports : [AppModule],
        declarations: []
     })
    fixture = TestBed.createComponent(ToastMessageComponent);
    component = fixture.componentInstance;
  });

    it('should be created toast mssage Component', () => {
      expect(component).toBeTruthy();
  });
});
