import { NgModule, Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Router } from '@angular/router';
import { AdminService } from '../../service/admin/admin.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

declare var jQuery: any;
declare var $: any;
class Signin {
  constructor(public email: string = '',
    public password: string = '',
  ) {
  }
}



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
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
export class AdminDashboardComponent implements OnInit {

  email;
  Userdetails: any = [];
  UserProfileImage: any = [];
  current_token;
  UserProfileImage_url = [];
  male;
  female;
  searchDistance;
  public someRange: number[] = [10, 25];
  public aimrange: number[] = [18, 25];
  imagestore = [];
  userAboutMe;
  username1;
  age;
  modalRef: BsModalRef;
  upload_loader: boolean;
  uploadedFileName;
  selectedFile: File;
  isdisable_upload;
  facebookId;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private adminApi: AdminService,
  ) {

    this.email = localStorage.getItem("userLoggedEmail");
    console.log("email", this.email);

    if (this.email == null) {
      this.router.navigate(['/admin/lp-login']);
    }
    this.uploadedFileName = "";

  }

  ngOnInit() {
    this.upload_loader = false;
    this.isdisable_upload = true;
    this.getUserData();

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getUserData() {
    this.userAboutMe = "";
    this.Userdetails = [];
    this.UserProfileImage_url = [];
    this.someRange = [];
    this.UserProfileImage = [];
    this.imagestore = [];

    //Loged in user email
    let data = {
      "email": this.email
    }




    //GET User API
    this.adminApi.getProfileData(data).subscribe(res => {
      console.log("User Record ..", res);


      let status = res['status'];

      if (status == true) {
        let userdata = res['user'];
        let userimage = userdata.userImage;
        //this.UserProfileImage_url = userimage[0];
        console.log("Profiledata", userdata);

        this.userAboutMe = userdata.userAboutMe;
       console.log("User--About is",this.userAboutMe);

        for (var i = 0; i < 1; i++) {
          this.UserProfileImage_url.push({ url: userimage[i] });
        }

        this.facebookId = userdata.facebookId;
        this.Userdetails.push({
          "age": userdata.age,
          "distance": userdata.distance,
          "gender": userdata.gender,
          "homeTown": userdata.homeTown,
          "name": userdata.name,
          "username1": userdata.username1,
          "picture": userimage[0],
          "userAboutMe": userdata.userAboutMe
        });

        this.username1 = userdata.username1;
        this.age = userdata.age;
        for (var i = 0; i < 6; i++) {
          var avt_url = userimage[i];
          console.log("url is:", avt_url);
          var user_image;

          this.imagestore.push({ url: avt_url });
        }

        this.searchDistance = userdata.searchDistance;
        console.log("search-distance", this.searchDistance);

        let searchInterestedIn = userdata.searchInterestedIn;

        console.log("searchInterestedIn", searchInterestedIn);



        if (userdata.gender == "Male") {
          this.male = true;
          this.female = false;
        }
        else if (userdata.gender == "Female") {
          this.female = true;
          this.male = false;
        }



        console.log("Age-rage", userdata.ageRange);
        this.someRange = userdata.ageRange;
        this.aimrange = userdata.searchMinMax;
        let length = userimage.length;
        for (var i = 0; i < length; i++) {
          var avt_url = userimage[i];
          this.UserProfileImage.push(avt_url);
        }
      }




    });
  }





  onFileChanged(event) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.isdisable_upload = false;
    }
    console.log("file", this.selectedFile);
    this.uploadedFileName = this.selectedFile.name;
  }

 
  confirm_delete_img(i) {

    this.imagestore = [];

    console.log("image delete api is call");
    console.log("delete image number is", i);
    let num = i;

    let data = {
      "email": this.email,
      "num": num,
      "facebookId": this.facebookId
    }

    this.adminApi.userDeleteImage(data).subscribe(res => {
      console.log("image is deleted", res);
      let user = res['user'];
      let userimage = user.userImage;
      this.getUserData();
      this.modalRef.hide();
    });
  }
  onChangeMale() {

    if (this.male == true) {
      this.female = false;
    }
    else {
      this.female = true;
    }
    console.log("male is", this.male);
    console.log("female is", this.female);
  }
  onChangeFemale() {

    if (this.female == true) {
      this.male = false;
    }
    else {
      this.male = true;
    }
    console.log("female is", this.female);
    console.log("male is", this.male);
  }

  updateGender() {
    console.log("Gender update funtion is call");
    console.log("female is", this.female);
    console.log("male is", this.male);
    let gender;
    if (this.female == true) {
      gender = "Female";
    }
    else {
      gender = "Male";
    }
    if (this.male == true) {
      gender = "Male";
    } else {
      gender = "Female";
    }

    let data = {
      "email": this.email,
      "gender": gender,
      "facebookId": this.facebookId
    }
    this.adminApi.userGender(data).subscribe(res => {
      console.log("user Gender is updated success..", res);
      this.getUserData();
    });
  }

  updateAbout(userabout) {
    console.log("About update funtion is call");
    console.log("user_edited_data", userabout);

    let data = {
      "email": this.email,
      "userAboutMe": userabout,
      "facebookId": this.facebookId
    }
    this.adminApi.userAbout(data).subscribe(res => {
      console.log("user About is uploaded success..", res);
      this.getUserData();
    });

  }



  Accept() {
    console.log("About Accept funtion is call");
    let data = {
      "email": this.email,
      "facebookId": this.facebookId
    }
    this.adminApi.userApprove(data).subscribe(res => {
      console.log("user Approve is  success..", res);
      this.getUserData();
    });
  }
  Suspend() {
    console.log("About Suspend funtion is call");
    let data = {
      "email": this.email,
      "facebookId": this.facebookId
    }
    this.adminApi.userSuspend(data).subscribe(res => {
      console.log("user Suspend is success..", res);
      this.getUserData();
    });

  }


  LogoutProfile() {
    console.log("logout profile is call....");
    // this.authService.signOut();

    let token = localStorage.getItem("userLoggedEmail");
     console.log("session",token);

    localStorage.removeItem('userLoggedEmail');

    let token1 = localStorage.getItem("userLoggedEmail");
      console.log("session1",token1);
    this.router.navigate(['/admin/lp-login']);
}


}
