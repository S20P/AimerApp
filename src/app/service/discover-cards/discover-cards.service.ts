import { Injectable,ChangeDetectorRef } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DiscoverCardsService {

  url : string = "https://aimerappdev.herokuapp.com/user/discoverCards";

  AccessAppToken;

  constructor(private http: HttpClient) { 
            this.AccessAppToken = localStorage.getItem("AccessAppToken");

          console.log("AccessAppToken....",this.AccessAppToken);   
              }
     


  getDiscoverCard(data) {
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer '+this.AccessAppToken);

      // let data1 = {"userCoordinates":[72.8749303,21.2360619]};
     
    
      console.log("userCoordinates_",data);

       return this.http.post(this.url,data,{ headers: headers })
  
  }


}
