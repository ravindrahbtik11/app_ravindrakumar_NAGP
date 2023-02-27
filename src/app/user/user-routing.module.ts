import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'register', component: RegistrationComponent },
        ])
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }