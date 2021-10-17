import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/ShopingList/shopping.service';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe : Recipe
  id : number
  isOpen : boolean = false;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService : RecipeService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }
 
  onToShoppingList(){
    // 1 option. Using map() to pass the each ingredient in the array
    // this.recipe.ingredients.map((ingredient)=>{
    //   this.shoppingListService.addIngredient(ingredient)
    // })
    // or use spread oprator in the shopping list service to push the list of ingredients
    this.shoppingListService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['/shopping-list'])
  }

  toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.route})
    // defining more complex path. Going one level up i.e /recipes and then adding the id and edit.
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo : this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
