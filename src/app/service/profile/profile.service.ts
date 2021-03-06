import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class ProfileService {
   
   delete_image_url : string = "https://aimerappdev.herokuapp.com/profile/delete/image";
   upload_image_url : string = "https://aimerappdev.herokuapp.com/profile/uploadImage"; 
   editProfile_url  : string = "https://aimerappdev.herokuapp.com/profile/editProfile";
   searchSettingProfile_url :string = "https://aimerappdev.herokuapp.com/user/searchSetting";
   setupProfile_url : string ="https://aimerappdev.herokuapp.com/profile/setupProfile";
   deactiveAccount_url : string = "https://aimerappdev.herokuapp.com/user/delete/account";
   headers = new HttpHeaders().set('Content-Type', 'application/json');
   AccessAppToken:string;
   
  constructor(private http: HttpClient, private router: Router) {
  
    this.AccessAppToken = localStorage.getItem("AccessAppToken");

    console.log("AccessAppToken....",this.AccessAppToken);

   }

   delete_image(num) {
      let paramdata = {"num":num};
      let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
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
  
    let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
                
     return this.http.post(this.upload_image_url,form,{ headers: headers })
 }


 editProfile(data){
      let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
      return this.http.post(this.editProfile_url,data,{ headers: headers })
 }

 getProfileData(){
  let headers = new HttpHeaders().set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.get(this.editProfile_url,{ headers: headers })
}

 searchSettingProfile(data){
  let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
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

  let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(this.setupProfile_url,data,{ headers: headers })
}


DeactivateAccount(data){
  let headers = this.headers.set('authorization', 'Bearer '+this.AccessAppToken);
  return this.http.post(this.deactiveAccount_url,data,{ headers: headers })
}



}

