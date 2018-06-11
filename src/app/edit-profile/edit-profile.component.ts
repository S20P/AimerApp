import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from 'angularx-social-login';
import { MemberService } from '../service/member/member.service';
import { Router } from '@angular/router';
import { ProfileService } from '../service/profile/profile.service';

declare var jQuery: any;
declare var $: any;

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
    public someRange: number[] = [10, 25];
    public aimrange: number[] = [18, 25];
    modalRef: BsModalRef;
    Userdetails: any = [];
    UserProfileImage: any = [];
    current_token;
    UserProfileImage_url = [];
    male;
    female;
    searchDistance;

    DeleteReason = [];

    reason_btn_disabled:boolean;
    reason_val;
    upload_loader;
    reason_isSelected;
    constructor(
        private modalService: BsModalService,
        private authService: AuthService,
        private MemberApi: MemberService,
        private router: Router,
        private ProfileApi: ProfileService,
    ) {

        let AccessAppToken = localStorage.getItem("AccessAppToken");

        if (AccessAppToken == null) {
            this.router.navigate(['/']);
        }

        this.DeleteReason = [
            "I've met someone",
            "Something is broken",
            "I don't like AimerApp",
            "other"
        ];
        this.reason_btn_disabled = true;

    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit() {
        // $("#carousel").carousel();



        this.getProfileData();

    }
    getProfileData() {
        this.Userdetails = [];
        this.UserProfileImage_url = [];
        this.someRange = [];
        this.UserProfileImage = [];

        this.ProfileApi.getProfileData().subscribe(res => {

            let status = res['status'];

            if (status == true) {
                let userdata = res['user'];
                let userimage = userdata.userImage;
                //this.UserProfileImage_url = userimage[0];
                console.log("Profiledata", userdata);
                for (var i = 0; i < 1; i++) {

                    this.UserProfileImage_url.push({ url: userimage[i] });
                }

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


                this.searchDistance = userdata.searchDistance;
                console.log("search-distance", this.searchDistance);

                let searchInterestedIn = userdata.searchInterestedIn;

                console.log("searchInterestedIn", searchInterestedIn);


                for (var g = 0; g < searchInterestedIn.length; g++) {
                    if (searchInterestedIn[g] == "Male") {
                        this.male = true;
                    }
                    else if (searchInterestedIn[g] == "Female") {
                        this.female = true;
                    }
                }


                console.log("Age-rage", userdata.ageRange);
                this.someRange = userdata.ageRange;
                this.aimrange = userdata.searchMinMax;
                let length = userimage.length;
                for (var i = 0; i < length; i++) {
                    var avt_url = userimage[i];
                    var user_image;
                    //  var Image_check = isUrlExists(avt_url);

                    // if (Image_check == false) {
                    //   console.log('Image does not exist');
                    //   user_image = "/assets/not_found.jpg"
                    // }
                    // else {
                    //   console.log('Image Exists');
                    //   user_image = avt_url;
                    // }

                    this.UserProfileImage.push(avt_url);
                }
            }

        });

        function isUrlExists(image_url) {
            var Image_Exists = false;
            $.ajax(
                {
                    async: false,
                    url: image_url,
                    success: function (data) {
                        Image_Exists = true;
                    },
                    error: function (data) {
                        Image_Exists = false;
                    }
                });

            return Image_Exists;
        }

    }
    onChange(value: any) {
        this.aimrange = value;

        console.log("onchange-range", this.aimrange);
    }



    saveSettingProfile(formdata) {
        console.log("save settings....");
        console.log("form-data", formdata);

        let ageRange = formdata.aimrange;
        let searchDistance = formdata.searchDistance;

        let gender = [];
        if (formdata.male == true) {
            gender.push("Male");
        }
        if (formdata.female == true) {
            gender.push("Female");
        }


        let searchSetting_data = {
            "searchMinMax": ageRange,
            "searchDistance": searchDistance,
            "searchInterestedIn": gender
        }


        this.ProfileApi.searchSettingProfile(searchSetting_data).subscribe(res => {
            console.log("User Profile Setting is Successfull Updated..", res);

            this.getProfileData();
        });
    }




    

    LogoutProfile() {
        console.log("logout profile is call....");
        // this.authService.signOut();

        let token = localStorage.getItem("AccessAppToken");
        // console.log("session",token);

        localStorage.removeItem('AccessAppToken');

        let token1 = localStorage.getItem("AccessAppToken");
        //  console.log("session1",token1);
        this.router.navigate(['/']);
    }



    selecteReasonChange(item,i){
        this.reason_isSelected = i;
        this.reason_btn_disabled = false;
        this.reason_val = item;
        console.log("reason is", this.reason_val);
    }


    DeactiveSubmit(){
         this.upload_loader = true;
         console.log("Deactive_save", this.reason_val);
         let data  =  {"deleteReason": this.reason_val}

         // Call Deactivat or Delete User Acoount
         this.ProfileApi.DeactivateAccount(data).subscribe(res => {
            console.log("User Profile  is Successfull Deactiveted..", res);
            if(res){
                this.modalRef.hide();
                status = res['status'];
                if(status=='Active'){
                    this.router.navigate(['/']);
                }
                if(status=="deactivated"){
                    this.router.navigate(['/']);
                    this.LogoutProfile();
                }
            }
            else{
                this.modalRef.hide();
            }
        });

       

    }



}
