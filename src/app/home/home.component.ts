import { Component, OnInit } from '@angular/core';

import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';


import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: SocialUser;
  token = "EAAHqWDZAUh7QBAPDseC2gBIKXEbNOpReaiCPqbqzLZCUDbgt7XdznNsMBGyzR58bhfFgjCUc33LD31p2KQ59v7UjnXSZAc0ZCNJvrBYfO8dZACmIORO02RRStrfqRZAbcOhCPu0k2n2FjaFpZAZAWtaG2zq6EYiINqrXGfup9y8Wh7PfxvY8b3a7RmxkVve8j19EchnIgSfllAZDZD";
  fb_authToken;
  constructor(private MemberApi:MemberService,
               private ConnectionApi:ConnectionService,
               private authService: AuthService,
               private router: Router
             ) {   }

  ngOnInit() {
    
   // this.getmemberData(token);
    //this.getconnectionData(this.token);

    // this.authService.authState.subscribe((user) => {
    //   console.log("user-data1",user);
    //   this.user = user;
    //   this.fb_authToken = this.user.authToken;
    //   this.getmemberData(this.fb_authToken);
    // });

  }



   
  // //connection api call 
  //  getconnectionData(token) {
  //     this.ConnectionApi.getconnection(token).subscribe(res => {
  //      console.log("connection-data",res);
  //      });
  //  }   

 
   signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log("you loged in facebook");

    this.authService.authState.subscribe((user) => {
      console.log("user-data1",user);
      if(user){
      this.user = user;
      this.fb_authToken = this.user['authToken'];
      localStorage.setItem("fb_authToken", this.fb_authToken);
      this.getmemberData();
      }
    });

   // console.log("user-data2",this.user);
  //  this.getmemberData(this.user.authToken);
  }

  // signOut(): void {
  //   this.authService.signOut();
  // }



  //member api call
  getmemberData() {
    console.log("data");
        this.MemberApi.getmember().subscribe(res => {
         console.log("member-data",res);
         let oldUser = res['oldUser'];
         let status = res['status'];
 
         if(oldUser==false&&status==true){
           console.log("info",res['info']);
           localStorage.setItem("userlogedis", "false");
           this.router.navigate(['setup-profile']);
         }
         else{
           console.log("Already Member",res['info']);
           console.log("olduser is..",oldUser);
 
           let myObj = { userlogin: 'true', token: res['token'] };
           let userdata = res['user'];
           localStorage.setItem("usercheck", JSON.stringify(myObj));
           localStorage.setItem("usermember", JSON.stringify(userdata));
           this.router.navigate(['swipe-cards']);
         }
 
         });
     }


}
