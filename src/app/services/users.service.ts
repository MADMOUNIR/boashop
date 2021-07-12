import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultLogin } from '../model/result-login';
import { Users } from '../model/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userId : string = 'X';
  token : string = 'X';
  userSubject = new Subject<Users>();
  isAuth : boolean = false ;

  constructor(private http : HttpClient) { }

  emitUser() : void
  {
    this.userSubject.next();
  }

   //Authentifier un utilisateur
   authentifier(newUser : Users)
   {
     return new Promise(
       (resolve,reject) => {
         const url = `${environment.URL_API+'api/users/login'}` ;


         this.http.post(url,newUser).subscribe(
           (data : any) => {
             if(!data.message)
             {
               //Athentification réussi
               this.userId = data.userId ;
               this.token = data.token ;
               console.log("user ID :"+ this.userId );
               console.log("token :" + data.message);
               this.isAuth = true;
               this.emitUser();
               resolve(data.token);
             }
             else
             {
              //erreur d'authentification
               console.log(" erreur d'authentification BE :"+ data.message);
               reject(data.message);
             }
           },
           (error) => {
             console.log("error :"+error);
             reject(false);

           }
         );
       }
     );
   }


    //Créer un utilisateur
    createUser(newUser : Users)
    {
      return new Promise(
        (resolve,reject) =>
        {
          const url = `${environment.URL_API+'api/users/signup'}` ;

        this.http.post(url , newUser).subscribe(
          (data : any) => {
            //s'il y a pas de message donc pas d'erreur
            if(data.status == 201)
            {
             console.log('user created !');
             this.authentifier(newUser) ;
             resolve(data.userId);
            }
            else
            {
              reject(data.message);
              console.log(data.message);

            }
          },
          (error) => {
            console.log("error :"+error);
            reject(error);

          }
        );


        }

      );
    }
}
