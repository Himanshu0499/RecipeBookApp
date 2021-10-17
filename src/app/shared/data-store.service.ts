import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../RecipeBook/recipe-list/recipe.model";
import { RecipeService } from "../RecipeBook/recipe.service";
import {exhaustMap, map, take, tap} from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn : 'root'})
export class DataStoreService {
   constructor(private http : HttpClient,
               private recipeService : RecipeService,
               private authService : AuthService){}

   storeRecipes(){
      const recipes = this.recipeService.getRecipes()
      return this.http.put(
         'https://angularrecipebookapp-default-rtdb.firebaseio.com/recipes.json', 
         recipes,

      )
   }

   fetchRecipes(){
      return this.http.get<Recipe[]>(
         'https://angularrecipebookapp-default-rtdb.firebaseio.com/recipes.json'
      ).pipe(
         map(recipes => {      // map operator to transform the response 
            return recipes.map( recipes => {        //using map JS method 
               return { ...recipes, ingredients : recipes.ingredients ? recipes.ingredients : []} 
                  // spreading the recipe data, and checking if recipe has ingredients, if not setting it to empty array.
               })
         }),
         tap(recipes => {
            this.recipeService.storeFetchedRecipes(recipes);
         })
      )
   }
}