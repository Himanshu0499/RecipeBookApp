import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  editMode = false
  recipeForm : FormGroup
  constructor(private route : ActivatedRoute, 
              private recipeService : RecipeService,
              private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;       // editMode is set to true if we get the id from params
        // calling init form when we get id form the params of the route.(which we'll get when we select a recipe)
        this.initForm();          
      }
    )
  }

  // submitting the form
  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  
  //getting access to the controls in the ingredients array.

  get controls(){     
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  // adds new form group in ingredient form array.

  onAddIngredient(){        
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'quantity' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // initializing the Form
  private initForm(){
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])
    
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImage = recipe.imageUrl;
      recipeDescription = recipe.description;
      if(recipe.ingredients){               // checking if recipe contains ingredients 
        for( let ingredient of recipe.ingredients){     // looping through all the ingredient arrays in the array
          recipeIngredients.push(         // pushing the form group in the form array
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'quantity' : new FormControl(ingredient.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imageUrl' : new FormControl(recipeImage, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    })
  }
}

