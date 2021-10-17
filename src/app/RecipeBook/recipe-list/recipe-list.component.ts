import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[]= [];


  constructor( private recipeService : RecipeService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
    
    this.recipeService.recipeChanged.subscribe(
      (recipe : Recipe[])=> {
        this.recipes = recipe
      }
    )
  }
  
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo : this.route})
  }
}