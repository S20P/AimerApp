import {
  Component, OnInit, AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';
import { ProfileService } from '../service/profile/profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-daily-limit',
  templateUrl: './daily-limit.component.html',
  styleUrls: ['./daily-limit.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { noPause: true, showIndicators: true, noWrapSlides: false } }
  ]
})
export class DailyLimitComponent implements OnInit {

 

  UserProfileImage_url = [];
  constructor(private router: Router,
    private MemberApi: MemberService,
    private ProfileApi: ProfileService,
  

  ) {
    let AccessAppToken = localStorage.getItem("AccessAppToken");

    if (AccessAppToken == null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getProfileData();

  
  }
   

   

  getProfileData() {
    this.UserProfileImage_url = [];

    this.ProfileApi.getProfileData().subscribe(res => {
      console.log("member-data", res);

      let status = res['status'];

      if (status == true) {
        let userdata = res['user'];
        let userimage = userdata.userImage;
        //this.UserProfileImage_url = userimage[0];
        for (var i = 0; i < 1; i++) {
          this.UserProfileImage_url.push({ url: userimage[i] });
        }
      }

    });
  }

}
