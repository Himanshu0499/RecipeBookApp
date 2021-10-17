import { Component, OnDestroy, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStoreService } from "../shared/data-store.service";



@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

    recipeSaved = false;
    isSaving = false;
    isAuthenticated = false;

    userSub : Subscription;
    constructor(private dataStoreService : DataStoreService, 
                private authService : AuthService,
                private router : Router){}
    
    ngOnInit(){
        this.userSub = this.authService.user.subscribe(
            (user) => {
               this.isAuthenticated = !user ? false : true;
            }
        );
    }
    
    onCheckAuth(){
        if(this.isAuthenticated === false){
            alert("You need to login first")
            this.router.navigate(['/auth'])
        }
    }
    onStoreData(){
        this.isSaving = true;
        this.dataStoreService.storeRecipes()
        .subscribe((data) => { 
            this.isSaving = false;
            this.recipeSaved = true;
            console.log(data) 
            setTimeout(()=> { 
                this.recipeSaved = false
            }, 1300)
        })  
    }
    onFetchData(){
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe()
    }
}