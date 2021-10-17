export class User {
    constructor(
        public email : string,
        public id : string,
        private _token : string,                
        private _tokenExpirationDate : Date
        // both ar private so that u cannot retrive them directly.
    ){}

    get token(){
        //if there is no expiration date or the token is expired(current date is greater than expiration date) 
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token   
    }
}