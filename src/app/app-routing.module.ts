
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoute: Routes = [
    {path : '', redirectTo : '/recipes', pathMatch : 'full'},
    //{path : 'recipes', loadChildren : './RecipeBook/recipes.module#RecipesModule' }
    //Alternate syntax
    {path : 'recipes', loadChildren : () => import('./RecipeBook/recipes.module').then(m => m.RecipesModule) },
    {path : 'shopping-list', loadChildren : () => import('./ShopingList/shopping-list.module').then(m => m.ShoppingListModule) },
    {path : 'auth', loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule) },
    
    {path : 'not-found', component : NotFoundComponent },
    {path : '**', redirectTo : 'not-found'}
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoute, {preloadingStrategy : PreloadAllModules})
    ],
    exports : [RouterModule]
})
export class AppRoutingModule{}