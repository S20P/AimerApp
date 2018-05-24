import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';

import {AuthService} from 'angularx-social-login';
import {MemberService} from '../service/member/member.service';
import {Router} from '@angular/router';
import { ProfileService } from '../service/profile/profile.service';


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    providers: [
        {
            provide: CarouselConfig,
            useValue: {
                noPause: true,
                showIndicators: true,
                noWrapSlides: false
            }
        }
    ]

})
export class EditProfileComponent implements OnInit {
    public someRange: number[] = [18, 25];
    public aimrange: number[] = [18, 25];

    Userdetails: any = [];
    UserProfileImage: any = [];
    current_token;
    UserProfileImage_url = [];
    male;
    female;
    searchDistance;
    constructor(
        private authService : AuthService,
        private MemberApi : MemberService,
        private router : Router,
        private ProfileApi:ProfileService,
    ) {}

    ngOnInit() {
        this.getmemberData();
        let usercheck = JSON.parse(localStorage.getItem("usercheck"));
        //let usermember = JSON.parse(localStorage.getItem("usermember"));

        if (usercheck.userlogin == "false") {
            this.router.navigate([' ']);
        }

        this.current_token = usercheck.token;
        //let userimage = usermember.userImage;
        //this.UserProfileImage_url = userimage[0];

       

    }
    getmemberData() {
        this.Userdetails = [];
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

            this.Userdetails.push({
                "age": userdata.age,
                "distance": userdata.distance,
                "gender": userdata.gender,
                "homeTown": userdata.homeTown,
                "name": userdata.name,
                "username1": userdata.username1,
                "picture": userimage[0],
            });


           this.searchDistance = userdata.searchDistance;
           console.log("search-distance",this.searchDistance);

          let  searchInterestedIn = userdata.searchInterestedIn;

          console.log("searchInterestedIn",searchInterestedIn);

          
          for(var g=0;g<searchInterestedIn.length;g++){
                 if(searchInterestedIn[g]=="Male"){
                    this.male = true;
                 }
                 else if(searchInterestedIn[g]=="Female"){
                    this.female = true;
                 }
          }
           
      

        this.someRange = userdata.ageRange;
        this.aimrange = userdata.ageRange;
        let length = userimage.length;
        for (var i = 0; i < length; i++) {
            this.UserProfileImage.push(userimage[i]);
        }
          }
         }
         });
     }
    onChange(value : any) {
        this.aimrange = value;

        console.log("onchange-range", this.aimrange);
    }

   


    saveSettingProfile(formdata){
       console.log("save settings....");
       console.log("form-data",formdata);

      let ageRange = formdata.someRange;
      let searchDistance = formdata.searchDistance;

      let gender = [];
       if(formdata.male==true){
        gender.push("Male");
       }
       if(formdata.female==true){
       gender.push("Female");
       }
    

       let searchSetting_data = {
                "searchMinMax":ageRange,
                "searchDistance":searchDistance,
                "searchInterestedIn":gender
         }
       

         this.ProfileApi.searchSettingProfile(searchSetting_data).subscribe(res => {
             console.log("User Profile Setting is Successfull Updated..",res);
             
             this.getmemberData();
            });
    }

   

    LogoutProfile(){
        console.log("logout profile is call....");
         // this.authService.signOut();
              this.router.navigate(['/']);
    }


}
