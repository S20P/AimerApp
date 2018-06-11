import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class LikeService {
  userLike_url : string = "https://aimerappdev.herokuapp.com/user/userLike";
  superLike_url : string = "https://aimerappdev.herokuapp.com/user/superLike"; 
  disLike_url : string = "https://aimerappdev.herokuapp.com/user/dislike";

   headers = new HttpHeaders().set('Content-Type', 'application/json');
   AccessAppToken:string;

  constructor(private http: HttpClient, private router: Router,) {

    this.AccessAppToken = localStorage.getItem("AccessAppToken");

    console.log("AccessAppToken....",this.AccessAppToken);
   
   }

   userLike(data) {
      let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
       return this.http.post(this.userLike_url,data,{ headers: headers })
   }

   superLike(data) {
    let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
     return this.http.post(this.superLike_url,data,{ headers: headers })
 }

 disLike(data) {
  let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
   return this.http.post(this.disLike_url,data,{ headers: headers })
}

}

