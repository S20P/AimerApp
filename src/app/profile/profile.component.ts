import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from 'angularx-social-login';
import {MemberService} from '../service/member/member.service';
import {Router} from '@angular/router';

import { ProfileService } from '../service/profile/profile.service';

declare var jQuery: any;
declare var $: any;

@Component({
     selector: 'app-profile',
     templateUrl: './profile.component.html',
     styleUrls: ['./profile.component.css']
    })
    
export class ProfileComponent implements OnInit {
    modalRef: BsModalRef;
    UserProfileImage_url = [];
    imagestore = [];
    selectedFile: File;
    isdisable_upload;
    userAboutMe;
    upload_loader:boolean;
    uploadedFileName;
    constructor(
        private modalService : BsModalService,
        private authService : AuthService,
        private router : Router,
        private MemberApi : MemberService,
        private ProfileApi:ProfileService,
    ) {
      let AccessAppToken =  localStorage.getItem("AccessAppToken");
       
      if(AccessAppToken==null){
          this.router.navigate(['/']);
      }
    
       this.uploadedFileName = "";

    }

    openModal(template : TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit() {
     
        this.upload_loader = false;
        this.isdisable_upload = true;


      
        this.getProfileData();


        //let userimage = usermember.userImage;
       // this.UserProfileImage_url = userimage[0];

       // console.log("userimage",this.UserProfileImage_url);
        
         
         
         //console.log("image store",this.imagestore);
  


    }
    confirm_delete_img(i){

        this.imagestore = [];

        console.log("image delete api is call");
        console.log("delete image number is",i);
       let  num = i;
       this.ProfileApi.delete_image(num).subscribe(res => {
        console.log("image is deleted",res);

          let user = res['user'];
          let userimage = user.userImage;
          this.getProfileData();
          this.modalRef.hide();
       });
    }

  

    onFileChanged(event) {
        
        this.selectedFile = event.target.files[0];
   
        if( this.selectedFile ){
        this.isdisable_upload = false;
        }
        console.log("file",this.selectedFile);
        this.uploadedFileName = this.selectedFile.name;
     }

     onUpload(num){
        this.upload_loader = true;
        console.log("number of image is uploading....",num);
      //  let formData: FormData = new FormData();
       // formData.append("file[]", this.selectedFile, this.selectedFile.name);
          let data = {"no_img":num,"file":this.selectedFile};

          this.ProfileApi.uploadImage(data).subscribe(res => {
              console.log("image is uploaded success..",res);
              this.upload_loader = false;
              this.modalRef.hide();
              this.getProfileData();
             });
     }
   
     getProfileData() {
        this.UserProfileImage_url = [];
        this.imagestore = [];
   
        this.ProfileApi.getProfileData().subscribe(res => {
        
         let status = res['status'];
         
          if(status==true){
        
            let userdata = res['user'];
            console.log("User-data",userdata);
            let userimage = userdata.userImage;
            //this.UserProfileImage_url = userimage[0];
            this.userAboutMe = userdata.userAboutMe;
            for(var i=0; i<1;i++){
                this.UserProfileImage_url.push({url:userimage[i]});
             }

            for(var i=0; i<6;i++){
                var avt_url = userimage[i];
                console.log("url is:",avt_url);
                var user_image;
             
                this.imagestore.push({url:avt_url});
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


     updateProfile(userabout){
           console.log("user_edited_data",userabout);
           let data = {"userAboutMe":userabout};

           this.ProfileApi.editProfile(data).subscribe(res => {
               console.log("user profile is uploaded success..",res);
               this.getProfileData();
              });
     }





}
