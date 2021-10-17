import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { RecipeService } from "./RecipeBook/recipe.service";
import { ShoppingListService } from "./ShopingList/shopping.service";

@NgModule({
    providers : [
        ShoppingListService, 
        RecipeService, 
        { 
        provide : HTTP_INTERCEPTORS, 
        useClass : AuthInterceptor, 
        multi : true
        }
    ]
})
export class CoreModule{

}