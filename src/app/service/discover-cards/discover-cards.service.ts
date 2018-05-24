import { Injectable,ChangeDetectorRef } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class DiscoverCardsService {

  url : string = "https://aimerappdev.herokuapp.com/user/discoverCards";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlNDE1OGUwMWMyZDAwZDhiYjQxNjEiLCJmYWNlYm9va0lkIjoiMTI0NzAxNDIwNTM1MjI5NyIsInVzZXJuYW1lIjoiTmloYWwgRGVzYWkiLCJleHAiOjE1Mjc1NDQzMTUuNTQ5LCJpYXQiOjE1MjY0NjQzMTV9.2M3vjPOo8yfjcoKcbv96bTrGyU4sr2xAq6fPElVdTN8";
  
 
  constructor(private http: HttpClient) { 
               
              }
     


  getDiscoverCard(data) {
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
        headers = headers.set('authorization', 'Bearer ' + this.token);

      // let data1 = {"userCoordinates":[72.8749303,21.2360619]};
     
    
      console.log("userCoordinates_",data);

       return this.http.post(this.url,data,{ headers: headers })
  
  }


}
