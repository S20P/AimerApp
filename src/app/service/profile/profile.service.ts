import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class ProfileService {
   current_token;
   delete_image_url : string = "https://aimerappdev.herokuapp.com/profile/delete/image";
   upload_image_url : string = "https://aimerappdev.herokuapp.com/profile/uploadImage"; 
   editProfile_url  : string = "https://aimerappdev.herokuapp.com/profile/editProfile";
   searchSettingProfile_url :string = "https://aimerappdev.herokuapp.com/user/searchSetting";
   setupProfile_url : string ="https://aimerappdev.herokuapp.com/profile/setupProfile";
 
   headers = new HttpHeaders().set('Content-Type', 'application/json');
   fb_authToken;
  constructor(private http: HttpClient, private router: Router,) {

    let usercheck = JSON.parse(localStorage.getItem("usercheck"));

    if(usercheck.userlogin=="false"){
        this.router.navigate([' ']);
      }
    
    this.current_token = usercheck.token;

    this.fb_authToken = localStorage.getItem("fb_authToken");

    console.log("fb_authToken....",this.fb_authToken);

   }

   delete_image(num) {
      let paramdata = {"num":num};
      let headers = this.headers.set('authorization', 'Bearer ' + this.current_token);
       return this.http.post(this.delete_image_url,paramdata,{ headers: headers })
   }

   uploadImage(data) {

    let num = data.no_img;
    var key = "image"+num;
    var yourObject = {};
    yourObject[key] = data.file;

    const form = new FormData();
    form.append( key, data.file, data.file.name);

   console.log("param-data",yourObject);
  
    let headers = new HttpHeaders().set('authorization', 'Bearer ' +  this.current_token);
                
     return this.http.post(this.upload_image_url,form,{ headers: headers })
 }


 editProfile(data){
      let headers = this.headers.set('authorization', 'Bearer ' + this.current_token);
      return this.http.post(this.editProfile_url,data,{ headers: headers })
 }


 searchSettingProfile(data){
  let headers = this.headers.set('authorization', 'Bearer ' + this.current_token);
  return this.http.post(this.searchSettingProfile_url,data,{ headers: headers })
}



createUserProfile(udata){

  console.log("param_data_API",udata);

let data = {
  "username1":udata.username1,
  "handleName":udata.handleName,
  "gender":udata.gender,
  "age":udata.age,
  "userAboutMe":udata.userAboutMe,
  "relationshipStatus":udata.relationshipStatus,
  "religion":udata.religion,
  "language":udata.language,
  "pets":udata.pets,
  "profession":udata.profession,
  "personality":udata.personality,
  "userInterests":udata.userInterests,
  "children":udata.children,
  "education":udata.education,
  "searchIntent":udata.searchIntent,
  "searchMinMax":udata.searchMinMax,
  "searchDistance":udata.searchDistance,
  "searchInterestedIn":udata.searchInterestedIn
  }
console.log("myobj---",data);

  let headers = this.headers.set('authorization', 'Bearer ' + this.fb_authToken);
  return this.http.post(this.setupProfile_url,data,{ headers: headers })
}



}

