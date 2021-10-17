import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../../shopping.service';

@Component({
  selector: 'app-shoping-list-edit',
  templateUrl: './shoping-list-edit.component.html',
  styleUrls: ['./shoping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static : false}) slForm : NgForm
  subscription : Subscription
  editMode = false;
  editItemIndex : number
  editItem : Ingredient

  constructor( private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name : this.editItem.name,
          quantity : this.editItem.quantity
        })
      }
    )
  }

  addIngredient(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.quantity)  // making new instance of the Ingredient Model
    if(this.editMode){      // if editmode is true
      this.shoppingListService.updateIngredient(this.editItemIndex, value)
    }else{
      this.shoppingListService.addIngredient(newIngredient)
    }
    form.reset();
    this.editMode = false;
  }
  //clearing/resetting the form
  onClear(){
    this.slForm.reset()
    this.editMode = false
  }
  // deleting the selected item.
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();   // to clear the form
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
