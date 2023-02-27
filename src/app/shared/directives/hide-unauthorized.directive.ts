import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';



@Directive({
    selector: '[hideifunauthorized]'
})
export class HideUnauthorizedDirective implements OnInit {
    @Input() hideifunauthorized: any; // Required permission passed from controls
    constructor(private el: ElementRef, private authService: AuthService) {

    }

    ngOnInit() {
        // if (this.authService.hasPermission(this.hideifunauthorized)) {
        //     this.el.nativeElement.style.display = 'inline-block';
        // } else {
        //     this.el.nativeElement.style.display = 'none';
        // }
    }
}
