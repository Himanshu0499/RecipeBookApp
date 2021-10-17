import { Component,  Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe;
  @Input() recipeIndex : number

  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate([this.recipeIndex], {relativeTo : this.route})
  }
}

