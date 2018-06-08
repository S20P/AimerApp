import { Component, OnInit } from '@angular/core';

import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';
import { ProfileService } from '../service/profile/profile.service';


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
  fb_authToken;
  constructor(private MemberApi:MemberService,
               private ConnectionApi:ConnectionService,
               private authService: AuthService,
               private router: Router,
               private ProfileApi:ProfileService,
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
      var token = this.user['authToken'];
    //  let fbData = {
    //      Fb_details:user
    //  };
     // localStorage.setItem("fb_authToken",fbData);
      this.getmemberData(token);
      }
    });

   // console.log("user-data2",this.user);
  //  this.getmemberData(this.user.authToken);
  }

  // signOut(): void {
  //   this.authService.signOut();
  // }



  //member api call
  getmemberData(token) {
    console.log("data");

    //Check member API 
        this.MemberApi.getmember(token).subscribe(res => {
         console.log("member-data",res);
         let oldUser = res['oldUser'];
         let status = res['status'];
 
         if(oldUser==false&&status==true){

           // register API
           this.MemberApi.registerMember(this.user,token).subscribe(res => {
              console.log("Member register API data",res);

              if(res['setupProfileComplete']==true&&res['status']==true){

                   let AppToken = res['token'];
                  console.log("APP-Token",AppToken);
                  localStorage.setItem("AccessAppToken",AppToken);

               //get profile API
                  this.ProfileApi.getProfileData().subscribe(res => {
                    console.log("user profile is.",res);
                    let status1 = res['status'];
                    if(status1==true){
                      this.router.navigate(['swipe-cards']);
                    }
                    else{
                      this.router.navigate(['setup-profile']);
                    }
                   });
                //get profile API *end

              }
              else{
                this.router.navigate([' ']);
              }
           });
          //register API *end

         }
         else{
           console.log("Already Member",res['info']);
           console.log("olduser is..",oldUser);

           let AppToken = res['token'];
           console.log("APP-Token",AppToken);
           localStorage.setItem("AccessAppToken",AppToken);
        
           this.router.navigate(['swipe-cards']);
         }
 
         });
         //member API *end


     }


}
