import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   url = `${environment.URL_API+'api/users/login'}` ;
   products : Product[];
   products$  = new Subject<Product[]>();


   constructor(private http : HttpClient) { }

   emitProduct()
   {
     this.products$.next(this.products);
   }

   //-----------Récupération de tous les produits---------------//
   getProducts()
   {
    const url = `${environment.URL_API+'api/products'}` ;

    this.http.get(url).subscribe(

      (data : Data) => {
        if(data.status == 200)
        {
          this.products = data.result ;
          this.emitProduct();
          console.log("produit récupées avec succès !");

        }
        else
        {
          console.log("erreur recup product :"+data.message);
        }

      } ,
      (err) => {
        console.log(err);

      }
    );

   }

   //-----------Récupération de un produit---------------//
   getProductById(id : string)
   {
    const url = `${environment.URL_API+'api/products/'}`+id ;
    return new Promise(
      (resolve,reject) =>
      {
        this.http.get(url).subscribe(
            (data : Data) => {
              if(data.status == 200)
              {
                resolve(data.result);
              }
              else
              {
                console.log(data.message);
                reject(data.message);
              }

            },
            (err) =>
            {
              console.log(err);
              reject(err);

            }
        )

      }
    );


   }

   //-----------Creation d'un produit---------------//
   createNewProduct(product : Product , image : File)
   {
    const url = `${environment.URL_API+'api/products/'}`;
    return new Promise(
      (resolve,reject) =>
      {
        let productData : FormData =new FormData();
        productData.append('product',JSON.stringify(product));
        productData.append('image' , image);

        this.http.post(url , productData).subscribe(
            (data : Data) => {
              if(data.status === 201)
              {
                console.log("produit ajouté avec succès !");
                this.getProducts();
                resolve(data);
              }
              else
              {
                console.log(data.message);
                reject(data.message);
              }

            },
            (err) =>
            {
              console.log(err);
              reject(err);

            }
        )

      }
    );

   }

    //-----------Modification d'un produit---------------//
    updateProductById(id : string , prod : Product , image : File | string)
    {
      const url = `${environment.URL_API+'api/products/'}`+id;
      return new Promise(
        (resolve,reject) =>
        {
          let productData : FormData =new FormData();
            //traitement de l'image
            if(typeof image === 'string')
            {
              prod.image = image;
            }
            else
            {
              productData.append('image' , image);
            }

          productData.append('product',JSON.stringify(prod));

          this.http.put(url , productData).subscribe(
              (data : Data) => {
                if(data.status === 200)
                {
                  this.getProducts();
                  resolve(data);
                }
                else
                {
                  console.log(data.message);
                  reject(data.message);
                }

              },
              (err) =>
              {
                console.log(err);
                reject(err);

              }
          )

        }
      );
    }

     //-----------Suppression d'un produit---------------//
     deleteProductById(id : string )
     {
      const url = `${environment.URL_API+'api/products/'}`+id;
      return new Promise(
        (resolve,reject) =>
        {



          this.http.delete(url).subscribe(
              (data : Data) => {
                if(data.status === 204)
                {
                  this.getProducts();
                  resolve(data);
                }
                else
                {
                  console.log(data.message);
                  reject(data.message);
                }

              },
              (err) =>
              {
                console.log(err);
                reject(err);

              }
          )

        }
      );
     }


}
