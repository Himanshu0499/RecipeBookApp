
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shoping-list/shoping-list-edit/shoping-list-edit.component";
import { ShoppingListComponent } from "./shoping-list/shoping-list.component";


@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports : [
        RouterModule.forChild([
            {path : '', component: ShoppingListComponent }
        ]),
        FormsModule,
        SharedModule
    ],
    exports : [
        RouterModule,
        ShoppingListComponent,
        ShoppingListEditComponent,
    ]
})
export class ShoppingListModule{

}