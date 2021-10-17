import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

// creating interface of the response we will get back
export interface AuthResponseData{
   idToken : string,
   email : string,
   refreshToken : string,
   expiresIn : string,
   localId : string
}

@Injectable({providedIn : "root"})
export class AuthService{
   constructor(private http : HttpClient,
         private router : Router){}

   user = new BehaviorSubject<User>(null);            // subscribed  to this in header.component
	
	// SIGNING UP USERS

   signUp(email : string, password : string){
      return this.http.post <AuthResponseData>(      // telling post which type of data you will get back
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
         // The API key required here is in the Project setting of Firebase.
         {
            email : email,
            password : password,
            returnSecureToken : true
         }
         // This is the data the endpoint need. Check the docs
      ).pipe(
         catchError(this.handleErrors),
         tap(
            (resData) => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               )
            }
         )
      )
   }

	// LOGING IN USER

   login(email : string, password : string){
      return this.http.post<AuthResponseData>(
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
         {
            email : email,
            password : password,
            returnSecureToken : true
         }
      ).pipe(
         catchError(this.handleErrors),
         tap(
            (resData) => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               )
            }
         )
      )
   }

	// AUTO LOGIN

   autoLogin(){
      const userData : {
         email : string,
         id : string,
         _token : string,
         _tokenExpirationDate : string
      } = JSON.parse(localStorage.getItem('userData'));     // getting the userdata form the local storage.
      
      if(!userData){             // returning if there is no userData. stops the function
         return
      }

      const loadedUser = new User(                 // creating a new User instance with that userData.
         userData.email, 
         userData.id,
         userData._token,
         new Date(userData._tokenExpirationDate)
      )

      if(loadedUser.token){                        // Checking the token validity
         this.user.next(loadedUser)     
			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			//subtracting current time (in milliseconds) from the token expiration date.
			this.autoLogout(expirationDuration)           
      }
   }
 
	// LOGOUT.

   logout(){
      this.user.next(null);
      this.router.navigate(['/auth']);
		//localStorage.clear() 							// will clear all the data from localStorage.
		localStorage.removeItem('userData')
   }

	// AUTO LOGGIN OUT 
	autoLogout(expirationDuration){
		console.log(expirationDuration)
		setTimeout(
			() => {
				this.logout();
			},expirationDuration)
	}
 
	// FUNTION FOR HANDLING AUTHENTICATION.

   private handleAuthentication(email : string, userId : string, token : string, expiresIn : number){
      // creating a new Date object, adding the current timestamp(new Date().getTime()) in milliseconds,
      // with the expiresIn(which is in seconds) so multiplying it with 1000 to get milliseconds.
      // we will get expiration date in milliseconds, so converting to date object.
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)          
      const user = new User(email, userId, token, expirationDate)
      this.user.next(user)        // listening to this in DataStore service.
		this.autoLogout(expiresIn * 1000);				// setting logout timer.
      localStorage.setItem('userData', JSON.stringify(user))     // converting the user object to string and storing it in LocalStorage.
   }

	// FUNCTION FOR HANDLING ERRORS.

   private handleErrors(errorRes : HttpErrorResponse){
      let errorMsg = "An Unkown Error occured :("
         if(!errorRes.error || !errorRes.error.error){
               return throwError(errorMsg)
         }
         switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS' :
               errorMsg = "Email already exists";
               break;
            case 'OPERATION_NOT_ALLOWED' :
               errorMsg = "Password sign-in disabled";
               break;
            case 'EMAIL_NOT_FOUND' :
               errorMsg = "User Not Found";
               break;
            case 'INVALID_PASSWORD' :
               errorMsg = "Incorrect Password!";
               break;
         }
         return throwError(errorMsg)
   }
}