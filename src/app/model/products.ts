export interface IProducts {
  _id : string,
  name : string,
  description : string,
  price : number ,
  stock : number ,
  image : string ,
  userId : string ,
  createdAt : Date,



}

export class Product implements IProducts {

  _id : string ;
  name : string ;
  description : string ;
  price : number ;
  stock : number ;
  image : string ;
  userId : string ;
  createdAt : Date ;
  }



