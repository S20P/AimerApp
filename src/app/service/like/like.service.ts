import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class LikeService {

  base_url_api = "https://aimerappdev.herokuapp.com/";

  userLike_url: string = this.base_url_api + "user/userLike";
  superLike_url: string = this.base_url_api + "user/superLike";
  disLike_url: string = this.base_url_api + "user/dislike";
  MessageLike_url: string = this.base_url_api + "connection/makeConnection";

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  AccessAppToken: string;

  constructor(private http: HttpClient, private router: Router, ) {

    this.AccessAppToken = localStorage.getItem("AccessAppToken");

    console.log("AccessAppToken....", this.AccessAppToken);

  }

  userLike(data) {
    let headers = this.headers.set('authorization', 'Bearer ' + this.AccessAppToken);
    return this.http.post(this.userLike_url, data, { headers: headers })
  }

  superLike(data) {
    let headers = this.headers.set('authorization', 'Bearer ' + this.AccessAppToken);
    return this.http.post(this.superLike_url, data, { headers: headers })
  }

  MessageLike(data) {
    let headers = this.headers.set('authorization', 'Bearer ' + this.AccessAppToken);
    return this.http.post(this.MessageLike_url, data, { headers: headers })
  }



  disLike(data) {
    let headers = this.headers.set('authorization', 'Bearer ' + this.AccessAppToken);
    return this.http.post(this.disLike_url, data, { headers: headers })
  }

}

