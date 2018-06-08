import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MemberService {

  url : string = "https://aimerappdev.herokuapp.com/user/aimerapp/member";

  register_url : string = "https://aimerappdev.herokuapp.com/user/register";

 // token = "EAAHqWDZAUh7QBADQptGYQd2ZCPkqXCACwAjivyd1xURsj1nsNLni4zZBhUflRnNTAdB7GUrhbqnnb5Q1buopfzavcCKB1ZA9uWaEXSSDD19JnOCMW8vCYk2GbE5Pr3QYDlAiU8SZA6CUPZCJQz3yJZAtq4iKoiV4ToSOCeTX33cZBdSzlkisYoLNsLT2OkqmDal86Qd1CLQz5wZDZD";
  fb_authToken;
  constructor(private http: HttpClient) {

     this.fb_authToken = localStorage.getItem("fb_authToken");
     console.log("fb_authToken....",this.fb_authToken);
   }


  getmember(token) {

    console.log("fb_token--",this.fb_authToken);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer '+token);

       return this.http.get(this.url,{ headers: headers })

  }

//If no member signup this API is call
  registerMember(data,token){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer '+token);

   return this.http.post(this.register_url,data,{ headers: headers })
  }
 

  




  
}
