import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinner } from "./LoadingSpinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations : [
        LoadingSpinner,
        AlertComponent,
        PlaceholderDirective
    ],
    imports : [
        CommonModule
    ],
    exports : [
        CommonModule,
        LoadingSpinner,
        AlertComponent,
        PlaceholderDirective
    ]
})
export class SharedModule{

}