import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Router } from '@angular/router';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  Direction,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

import { AuthService } from 'angularx-social-login';
import { MemberService } from '../service/member/member.service';
import { DiscoverCardsService } from '../service/discover-cards/discover-cards.service';
import { LikeService } from '../service/like/like.service';
import { CurrentLocationService } from '../service/current-location/current-location.service';
import { ProfileService } from '../service/profile/profile.service';


@Component({
  selector: 'app-swipe-cards',
  templateUrl: './swipe-cards.component.html',
  styleUrls: ['./swipe-cards.component.css']
})
export class SwipeCardsComponent {


  userCoordinates;
  Userdetails: any = [];
  UserProfileImage: any = [];

  DiscoverCard_userdata: any = [];
  messageinput;
  UserProfileImage_url = [];

  aimcard = true;
  aimfullcard = false;

  latitude;
  longitude;
  senderName;
  senderImage;

  goMessageName;
  goMessage_userId;
  goMessage_facebookId;

  aimcards() {
    this.aimcard = false;
    this.aimfullcard = true;
  }

  closeaimcards() {
    this.aimcard = true;
    this.aimfullcard = false;
  }

  today = Date.now();
  voteupcounter = 0;
  // likeCards: number[] = [];
  // likeCardsCount = likeCards.length;

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  @ViewChild('aim-icon') aimIcon: ElementRef;
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShown: boolean = false;

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {

    this.autoShownModal.hide();
  }
  dailyLimit() {
    this.router.navigate(['daily-limit']);
  }

  onHidden(): void {
    this.isModalShown = false;

  }


  cards: Array<any>;
  stackConfig: StackConfig;
  modalRef: BsModalRef;

  errorMsg: string;
  currentLocation: Coordinates = null;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private router: Router,
    private authService: AuthService,
    private MemberApi: MemberService,
    private DiscoverCardsApi: DiscoverCardsService,
    private LikeApi: LikeService,
    private ref: ChangeDetectorRef,
    private currentlocationApi: CurrentLocationService,
    private ProfileApi: ProfileService,

  ) {


    let AccessAppToken = localStorage.getItem("AccessAppToken");

    if (AccessAppToken == null) {
      this.router.navigate(['/']);
    }

    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 2), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };

  }

  ngOnInit() {
    this.messageinput = "";
    this.aimcard = true;
    this.aimfullcard = false;
    // Either subscribe in controller or set in HTML
    this.cards = [];
    console.log("card_up", this.cards.length);

    if (this.cards.length > 0) {
      this.swingStack.throwin.subscribe((event: DragEvent) => {
        event.target.style.background = '#ffffff';
      });
    }



    console.log("card", this.cards);
    this.getProfileData();
    this.aimcard = true;
    this.aimfullcard = false;

    // let userimage = usermember.userImage;
    //this.UserProfileImage_url = userimage[0];

    this.searchByCurrent();

  }

  searchByCurrent() {
    let self = this;
    const accuracy = { enableHighAccuracy: true };
    //let options = {timeout: 100, enableHighAccuracy: true, maximumAge: 3600};
    self.currentlocationApi.getLocation(accuracy).subscribe(function (position) {
      self.currentLocation = position;
      console.log("current_location", self.currentLocation);

      let latlag = position['coords'];

      this.latitude = latlag.latitude;
      this.longitude = latlag.longitude;

      self.userCoordinates = { "userCoordinates": [this.longitude, this.latitude] };
      self.addNewCards(self.userCoordinates);

      self.ref.detectChanges();
    }, function (error) {
      self.errorMsg = error; self.ref.detectChanges();
      console.log("self.errorMsg", self.errorMsg);
    });
  }


  getProfileData() {

    //get profile API
    this.ProfileApi.getProfileData().subscribe(res => {
      console.log("user profile is.", res);
      let status1 = res['status'];
      if (status1 == true) {
        let userdata = res['user'];
        let userimage = userdata.userImage;
        let _id = userdata._id;
        localStorage.setItem("_id", _id);

        this.senderName = userdata.username1;
        this.senderImage = userimage[0];

        for (var i = 0; i < 1; i++) {
          this.UserProfileImage_url.push({ url: userimage[i], username1: userdata.username1 });
        }
      }
      else {
        this.router.navigate(['setup-profile']);
      }
    });
    //get profile API *end

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModal_(template) {
    console.log("template", template);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {

    this.modalRef.hide();
  }

  decline(): void {

    this.modalRef.hide();
  }

  ngAfterViewInit() {

  }

  onItemMove(element, x, y, r) {
    var color = '';
    var iconStyle = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x > 40) {
      element.classList.add("like");
      element.classList.remove("dislike");
      element.classList.remove("superlike");
    } else if (y < 0 && x > -40 && x < 40) {
      element.classList.add("superlike");
      element.classList.remove("like");
      element.classList.remove("dislike");

    } else if (x < -40) {
      element.classList.add("dislike");
      element.classList.remove("like");
      element.classList.remove("superlike");
    } else {
      element.classList.remove("superlike");
      element.classList.remove("like");
      element.classList.remove("dislike");

    }


    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }




  // Connected through HTML
  voteUp(like, template) {
    console.log("like", like);
    console.log("this like card--", this.cards);
    let cardsCount = this.cards.length;

    if (like == true) {

      var like_result = this.cards[cardsCount - 1];

      console.log("current-like-user", like_result);

      let facebookId = like_result.facebookId;
      let userId = like_result._id;

      let data = { "facebookId": facebookId, "userId": userId };

      this.LikeApi.userLike(data).subscribe(res => {
        console.log("like-data", res);
        var purchase = res['info'];

        if (purchase == "upgrade") {
          console.log("use daily-limit");
          this.showModal();
        }
        if (purchase == "like") {
          this.cards.pop();
        }
      });


    }
    if (like == "superlike") {

      console.log("senderName", this.senderName);
      console.log("senderImage", this.senderImage);

      var superlike_result = this.cards[cardsCount - 1];

      console.log("current-superlike-user", superlike_result);

      this.goMessageName = superlike_result.handleName;

      let facebookId = superlike_result.facebookId;
      let userId = superlike_result._id;

      this.goMessage_userId = facebookId;
      this.goMessage_facebookId = userId;

      this.openModal_(template);

    }

    if (like == false) {

      var dislike_result = this.cards[cardsCount - 1];

      console.log("current-like-user", dislike_result);

      let facebookId = dislike_result.facebookId;
      let userId = dislike_result._id;

      let data = { "facebookId": facebookId, "userId": userId };

      this.LikeApi.disLike(data).subscribe(res => {
        console.log("dislike-data", res);
        var purchase = res['info'];

        if (purchase == "upgrade") {
          console.log("use daily-limit");
          this.showModal();
        }

        if (purchase == "dislike") {
          this.cards.pop();
        }

      });


    }

    if (cardsCount == 1) {
      this.addNewCards(this.userCoordinates);
    }
    if (like) {
      this.voteupcounter++;

      // this.likeCards.push(1);

      if (this.voteupcounter == 5) {
        this.showModal();
      }

    } else {
      //this.recentCard = 'You disliked: ' + removedCard.email;
    }
  }

  // Add new cards to our array
  addNewCards(data) {
    this.cards = [];
    // let url= this.http.get('https://randomuser.me/api/?results=20&nat=ch&gender=female');
    // url.map(data => data["results"])
    // .subscribe(result => {
    //   for (let val of result) {
    //     this.cards.push(val);
    //   }
    // });

    //let token_static = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlNDE1OGUwMWMyZDAwZDhiYjQxNjEiLCJmYWNlYm9va0lkIjoiMTI0NzAxNDIwNTM1MjI5NyIsInVzZXJuYW1lIjoiTmloYWwgRGVzYWkiLCJleHAiOjE1Mjc1NDQzMTUuNTQ5LCJpYXQiOjE1MjY0NjQzMTV9.2M3vjPOo8yfjcoKcbv96bTrGyU4sr2xAq6fPElVdTN8";

    //console.log(" this.userCoordinates", this.userCoordinates);

    this.DiscoverCardsApi.getDiscoverCard(data).subscribe(res => {
      console.log("DiscoverCard-data", res);
      var userlist = res['users'];
      for (let val of userlist) {
        this.cards.push(val);
      }
      //  for(var u=0;u<userlist.length;u++){
      //   this.cards.push(userlist[u]);
      //  }
    });

    console.log("card_length", this.cards);

  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent) {
    console.log('Hook from the template', event.throwDirection);
  }


  SendLikeMessage(text) {
    this.modalRef.hide();
    var facebookId = this.goMessage_userId;
    var userId = this.goMessage_facebookId;
    let cardsCount = this.cards.length;
    let data = { "userId": userId, "facebookId": facebookId, "text": text, "senderName": this.senderName, "senderImage": this.senderImage };

    console.log("Send like message data", data);

    this.LikeApi.MessageLike(data).subscribe(res => {

      console.log("like-Message-data", res);
      var purchase = res['info'];

      if (purchase == "upgrade") {
        this.messageinput = "";
        console.log("use daily-limit");
        this.showModal();
      }
      if (purchase == "success") {

        this.cards.pop();

        this.messageinput = "";
      }

    });

  }

}
