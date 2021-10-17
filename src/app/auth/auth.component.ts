import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html',
    styleUrls : ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    isLoginMode : boolean = true;
    isLoading : boolean = false;
    error : string = null;
    @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;

    closeSub : Subscription;

    constructor(private authService : AuthService, 
                private router : Router,
                private compFactResolver : ComponentFactoryResolver){}
    
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }


    onSubmit(form : NgForm){
        if(form.invalid){
            return;
        }    
        const email = form.value.email;
        const password = form.value.password;

        let authObs : Observable<AuthResponseData>; 
        //creating a variable that will store an observable that we get as response from the requests

        this.isLoading = true
        if(this.isLoginMode){
            authObs = this.authService.login(email, password)
        }else{
            authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe(
            (resData) => {
                console.log(resData)
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            }, 
            errorMsg => {
                this.error = errorMsg
                this.showErrorAlert(errorMsg)
                this.isLoading = false;
            }
        )

        form.reset()
    }

    close(){
        this.error = null;
    }

    private showErrorAlert(message : string){
        const alertCompFact = this.compFactResolver.resolveComponentFactory(AlertComponent);
        const hostVcRef = this.alertHost.vcRef;
        hostVcRef.clear();
        const componentRef = hostVcRef.createComponent(alertCompFact);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.closeAlert.subscribe(
            () => {
                this.closeSub.unsubscribe();
                hostVcRef.clear(); // clearing the component reference to close the alert.
            }
        )
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}