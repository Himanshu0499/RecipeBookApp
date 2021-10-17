
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipe-list/recipe.model";

export class RecipeService{

    recipeChanged = new Subject<Recipe[]>()

    // private recipes : Recipe[]= [
    //     new Recipe('Recipe', 
    //     "Maybe it's Chicken, I don't know what the hell is this recipe", 
    //     'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    //     [
    //         new Ingredient('Chicken', '1'),
    //         new Ingredient('Peas(g)', '500')
    //     ]),
    //     new Recipe('Speghetti', 
    //     'This is an Egg Speghetti', 
    //     'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    //     [
    //         new Ingredient('Noodels', '1'),
    //         new Ingredient('Eggs', '2')
    //     ])
    // ];

    private recipes : Recipe[] = [];


    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(index : number){
        return this.recipes[index]
    }

    addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(i : number, recipe : Recipe){
        this.recipes[i] = recipe;
        this.recipeChanged.next(this.recipes.slice())
    }

    deleteRecipe(index : number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }

    storeFetchedRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
}