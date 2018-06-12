import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AdminService {

  baseAPI_Url : string = "https://aimerappdev.herokuapp.com";

//API List
  login:string = "/admin/auth/login";
  user:string = "/admin/get/user";
  userGenderChange:string = "/admin/change/userGender";
  userAbout_url:string = "/admin/change/userAbout";
  userApprove_url:string = "/admin/change/userApprove";
  userDeleteImage_url:string = "/admin/change/userDeleteImage";
  userSuspend_url:string = "/change/userSuspend";
 
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  AccessAppToken:string;

  constructor(private http: HttpClient, private router: Router){ 

    this.AccessAppToken = localStorage.getItem("AccessAppToken");
    console.log("AccessAppToken....",this.AccessAppToken);
  }

  Login(data){
    let API = this.baseAPI_Url+this.login;
    let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
    return this.http.post(API,data,{ headers: headers })
  }

  getProfileData(data){
    let API = this.baseAPI_Url+this.user;
    let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
    return this.http.post(API,data,{ headers: headers })
  }

  userDeleteImage(data) {
    let API = this.baseAPI_Url+this.userDeleteImage_url;
    let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
     return this.http.post(API,data,{ headers: headers })
 }

  
userGender(data){
  let API = this.baseAPI_Url+this.userGenderChange;
  let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(API,data,{ headers: headers })
}

userAbout(data){
  let API = this.baseAPI_Url+this.userAbout_url;
  let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(API,data,{ headers: headers })
}

userApprove(data){
  let API = this.baseAPI_Url+this.userApprove_url;
  let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(API,data,{ headers: headers })
}
userSuspend(data){
  let API = this.baseAPI_Url+this.userSuspend_url;
  let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(API,data,{ headers: headers })
}

}
