import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultLogin } from '../model/result-login';
import { Users } from '../model/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  currentUser : Users ;
  userSubject = new Subject<Users>();
  isAuth : boolean = false ;
  userName : string;
  token :string ='';

  constructor(private http : HttpClient) { }

  emitUser() : void
  {
    this.userSubject.next(this.currentUser);
  }

   //Authentifier un utilisateur
   authentifier(newUser : Users)
   {
     return new Promise(
       (resolve,reject) => {
         const url = `${environment.URL_API+'api/users/login'}` ;


         this.http.post(url,newUser).subscribe(
           (data : any) => {
             console.log(data);

             if(!data.message)
             {
               //Athentification réussi
               console.log(data);
              this.currentUser = {idUser : data.userId ,
                                  email : newUser.email,
                                  password : '' ,
                                  token : data.token ,
                                };


              //  this.userId = data.userId ;
                this.token = data.token ;
              //  this.userName = newUser.email;
              //  console.log("user ID :"+ this.userId );
              //  console.log("token :" +this.token);
              //Save Token in localstorage
              if(typeof(localStorage) !== "undefined")
              {
                localStorage.setItem('token' ,this.currentUser.token);
                localStorage.setItem('userId' ,this.currentUser.idUser.toString());

              }
              this.isAuth = true;
              this.emitUser();
              resolve(data);
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
             reject(error);

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
          (data : ResultLogin) => {
            //s'il y a pas de message donc pas d'erreur
            if(data.status == 201)
            {
             console.log('user created !');
             this.authentifier(newUser) ;
             resolve(data);
            }
            else
            {
              reject(data.message);
              console.log(data.message);

            }
          },
          (error) => {
            console.log("error create user :"+error.message);
            console.log(error);
            reject(error);

          }
        );


        }

      );
    }


     //Check token in local storage
     checkToken(token : string)
     {

      return new Promise(
        (resolve,reject) =>
        {
          const url = `${environment.URL_API+'api/users/check'}` ;

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
          let options = {
            headers: headers
             };

        this.http.post(url , null, options).subscribe(
          (data : ResultLogin) => {
            //s'il y a pas de message donc pas d'erreur
            if(data.status == 200)
            {
             console.log('token valid !');
             resolve(data);
            }
            else
            {
              console.log('token invalid !');
              reject(data.message);
              console.log(data.message);

            }
          },
          (error) => {
            console.log("errortoken invalid ! :"+error.message);
            console.log(error);
            reject(error);

          }
        );


        }

      );

     }

     logout() : void
     {
       this.currentUser = null ;
       this.isAuth = false;
       this.userSubject = new Subject<Users>();
     }

    }
