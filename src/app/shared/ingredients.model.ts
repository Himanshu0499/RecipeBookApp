// export class Ingredient{
//     public name: string;
//     public quantity : string;

//     constructor(name:string, quantity : string){
//         this.name = name;
//         this.quantity = quantity;
//     }
// }

// short way to make model
// we can add acessor directly in front of arguments

export class Ingredient{
    constructor(public name : string, public quantity : string){}
}
