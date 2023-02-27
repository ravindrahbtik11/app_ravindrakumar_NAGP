import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.modules";
import { RegistrationComponent } from "./registration/registration.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserService } from "./user.service";


@NgModule({
    declarations: [RegistrationComponent],
    imports: [SharedModule, UserRoutingModule],
    providers: [UserService]
})

export class UserModule {

}