
import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredients.model"

export class ShoppingListService{
    
    ingredientChanged = new Subject<Ingredient[]>()         // listening to this subject in list component

    startEditing = new Subject<number>()

    private ingredients : Ingredient[] = [
        new Ingredient('Eggs', '4'),
        new Ingredient('Cheese', '2')
    ]
    
    getIngredients(){
        return this.ingredients.slice()            // sending the copy of the ingredients array
    }

    getIngredient(i : number){
        return this.ingredients[i];
    }


    updateIngredient(index : number, ingredient : Ingredient){
        //this.ingredients.splice(index, 1, ingredient ); // using splice() to update 
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }

    //add ingrdient recieved from the shopping-list-edit component
    addIngredient(newIngredient){
        this.ingredients.push(newIngredient);
        this.ingredientChanged.next(this.ingredients.slice())       // emitting the copy of new Ingredients array
    }
    //adding ingredient received from the recipe details
    addIngredients(newIngredients){
        //spreding the array of new ingredients and pushing them 
        this.ingredients.push(...newIngredients)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index : number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice())
    }
}