import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingcomponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { SwingModule } from 'angular2-swing';
import { CarouselModule } from 'ngx-bootstrap';
import {MatSliderModule} from '@angular/material/slider';
import { NouisliderModule } from 'ng2-nouislider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ModalModule } from 'ngx-bootstrap';


//SocialLogin --------------------
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig,  FacebookLoginProvider , } from 'angularx-social-login';

// services API--------------
import { MemberService } from './service/member/member.service';
import { ConnectionService } from './service/connection/connection.service';
import { DiscoverCardsService } from './service/discover-cards/discover-cards.service';
import { LikeService } from './service/like/like.service';
import { ProfileService } from './service/profile/profile.service';
import { CurrentLocationService } from './service/current-location/current-location.service';


const fbLoginOptions = {
  scope: 'public_profile, email, user_birthday, user_friends',
  return_scopes: true,
  enable_profile_selector: true
}; 

const config = new AuthServiceConfig([
  
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('561602290896109',fbLoginOptions)
  }
 
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    routingcomponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AlertModule.forRoot(),
	FormsModule,
	BrowserAnimationsModule,
	MatDialogModule,
	ModalModule.forRoot(),
	SwingModule,
	HttpClientModule,
	CarouselModule.forRoot(),
	MatSliderModule,
	NouisliderModule,
  MatSlideToggleModule,
  SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MemberService,
    ConnectionService,
    DiscoverCardsService,
    LikeService,
    ProfileService,
    CurrentLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
