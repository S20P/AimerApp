import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';

@Component({
  selector: 'app-daily-limit',
  templateUrl: './daily-limit.component.html',
  styleUrls: ['./daily-limit.component.css'],
      providers: [
    { provide: CarouselConfig, useValue: { noPause: true, showIndicators: true , noWrapSlides:false } }
  ]
})
export class DailyLimitComponent implements OnInit {
  current_token;
  UserProfileImage_url = [];
  constructor(private router: Router,  private MemberApi:MemberService,) { }

  ngOnInit() {



    let usercheck = JSON.parse(localStorage.getItem("usercheck"));
    let usermember = JSON.parse(localStorage.getItem("usermember"));

    if(usercheck.userlogin=="false"){
      this.router.navigate([' ']);
    }
    this.getmemberData();

    this.current_token = usercheck.token;
 //   let userimage = usermember.userImage;
    //this.UserProfileImage_url = userimage[0];
 
  }
  getmemberData() {
    this.UserProfileImage_url = [];
    this.MemberApi.getmember().subscribe(res => {
     console.log("member-data",res);
     let oldUser = res['oldUser'];
     let status = res['status'];

     if(oldUser==false&&status==true){
       this.router.navigate(['create-profile']);
     }
     else{
      if(oldUser==true){
        let userdata = res['user'];
        let userimage = userdata.userImage;
        //this.UserProfileImage_url = userimage[0];
        for(var i=0; i<1;i++){
          this.UserProfileImage_url.push({url:userimage[i]});
       }
      }
     }
     });
 }

}
