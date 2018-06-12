import {NgModule,Component,OnInit,ViewChild} from '@angular/core';
import { FormsModule,FormGroup,FormControl} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import {Router} from '@angular/router';
import { AdminService } from '../../service/admin/admin.service';
import {CarouselConfig} from 'ngx-bootstrap/carousel';


class Signin {
  constructor(public email: string = '',
              public password: string = '',
          ) { 
          }
}


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
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
export class AdminLoginComponent implements OnInit {

  model: Signin = new Signin();
    //signinForm: any;
    @ViewChild('signinForm') signinForm: any;

    loginMsg;
    msg_error;
  constructor(
              private router : Router,
              private adminApi:AdminService,
            ) {

              this.msg_error = false;
               
              }

  ngOnInit() {

  }
 


  submitLogin(){
     
  console.log("<<----------------");

  if (this.signinForm.valid) {
            console.log("Form Submitted!");
            console.log("formdata",this.signinForm.value);

            let form_data_collection = this.signinForm.value;

           
          let  email  = form_data_collection.email;
          let  password  = form_data_collection.password;

 
       let  form_submited_data = {
        "username":email,
        "password":password,
       };
       
      console.log("param_object",form_submited_data);  
      this.adminApi.Login(form_submited_data).subscribe(res => {
        console.log("User Logdin  Successfull ..",res);
     
        let status = res['status'];
         if(status=="200"){
         console.log("user login is success");
         localStorage.setItem("userLoggedEmail",email);
           this.router.navigate(['admin/home']);
        }else{
            console.log("user not login",res);
            this.msg_error = true;
            this.loginMsg = res['info'];
            
            this.router.navigate(['admin/lp-login']);
         }
       });
  }
  




  console.log("---------------->>"); 
}


}
