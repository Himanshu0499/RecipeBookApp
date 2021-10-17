import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[] = []

  ingSubscription : Subscription
  constructor(private shoppingListServie : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListServie.getIngredients();
    //Subcribing to the Subject observable in shopping list service
    this.ingSubscription = this.shoppingListServie.ingredientChanged.subscribe(     // listening to ingredientChanged event
      (ingredients: Ingredient[]) =>{
        this.ingredients = ingredients
      }
    )
  }

  onEditItem(index : number){
    this.shoppingListServie.startEditing.next(index)
  }

  ngOnDestroy(){
    this.ingSubscription.unsubscribe
  }
}
