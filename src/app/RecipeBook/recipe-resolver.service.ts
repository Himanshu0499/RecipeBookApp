import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStoreService } from "../shared/data-store.service";
import { Recipe } from "./recipe-list/recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn : "root"})
export class RecipeResolver implements Resolve<Recipe[]>{
    
    constructor(private dataStorageService : DataStoreService,
                private recipeService : RecipeService){}
    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot)
    {
        const recipes = this.recipeService.getRecipes()
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes()
        }else{
            return recipes;
        }         
    }
}