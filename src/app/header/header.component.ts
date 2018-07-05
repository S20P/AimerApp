import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserProfileImage_url = [];

  constructor( private ProfileApi:ProfileService,
    private router: Router,
  
  ) {
    let AccessAppToken =  localStorage.getItem("AccessAppToken");
       
    if(AccessAppToken==null){
        this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    this.getProfileData();
  }
  getProfileData() {

    //get profile API
     this.ProfileApi.getProfileData().subscribe(res => {
      console.log("header user profile is.",res);
      let status1 = res['status'];
      if(status1==true){
        let userdata = res['user'];
        let userimage = userdata.userImage;
        let _id = userdata._id;
        localStorage.setItem("_id",_id);
        for(var i=0; i<1;i++){
          this.UserProfileImage_url.push({url:userimage[i],username1:userdata.username1});
       }
      }
      else{
        this.router.navigate(['setup-profile']);
      }
     });
  //get profile API *end

 }
}
