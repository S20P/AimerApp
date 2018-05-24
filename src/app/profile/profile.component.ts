import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from 'angularx-social-login';
import {MemberService} from '../service/member/member.service';
import {Router} from '@angular/router';

import { ProfileService } from '../service/profile/profile.service';


@Component({
     selector: 'app-profile',
     templateUrl: './profile.component.html',
     styleUrls: ['./profile.component.css']
    })
    
export class ProfileComponent implements OnInit {
    modalRef: BsModalRef;
    current_token; 
    UserProfileImage_url = [];
    imagestore = [];
    selectedFile: File;
    isdisable_upload;
    userAboutMe;
    upload_loader:boolean;
    constructor(
        private modalService : BsModalService,
        private authService : AuthService,
        private router : Router,
        private MemberApi : MemberService,
        private ProfileApi:ProfileService,
    ) {}

    openModal(template : TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit() {
     
        this.upload_loader = false;
        this.isdisable_upload = true;


        let usercheck = JSON.parse(localStorage.getItem("usercheck"));
        let usermember = JSON.parse(localStorage.getItem("usermember"));

        if (usercheck.userlogin == "false") {
            this.router.navigate([' ']);
        }

        this.current_token = usercheck.token;
        this.getmemberData();


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
          this.getmemberData();
          this.modalRef.hide();
       });
    }


  

    onFileChanged(event) {
        
        this.selectedFile = event.target.files[0];
   
        if( this.selectedFile ){
        this.isdisable_upload = false;
        }
        console.log("file",this.selectedFile);
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
              this.getmemberData();
             });
     }
   
    getmemberData() {
        this.UserProfileImage_url = [];
        this.imagestore = [];
   
        this.MemberApi.getmember().subscribe(res => {
         console.log("member-data",res);
         let oldUser = res['oldUser'];
         let status = res['status'];
 
         if(oldUser==false&&status==true){
           console.log("info",res['info']);
           this.router.navigate(['create-profile']);
           
         }
         else{
           console.log("Already Member",res['info']);
          if(oldUser==true){
           console.log("olduser is..",oldUser);
              
            let userdata = res['user'];
            let userimage = userdata.userImage;
            //this.UserProfileImage_url = userimage[0];
            this.userAboutMe = userdata.userAboutMe;
            for(var i=0; i<1;i++){
                this.UserProfileImage_url.push({url:userimage[i]});
             }

            for(var i=0; i<6;i++){
                this.imagestore.push({url:userimage[i]});
             }
          }
       
         }
 
         });
     }


     updateProfile(userabout){
           console.log("user_edited_data",userabout);
           let data = {"userAboutMe":userabout};

           this.ProfileApi.editProfile(data).subscribe(res => {
               console.log("user profile is uploaded success..",res);
               this.getmemberData();
              });
     }





}
