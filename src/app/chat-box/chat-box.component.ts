import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';
import { ProfileService } from '../service/profile/profile.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  UserProfileImage_url = [];
  connection_result = [];

 _id;


  constructor(private router: Router,
    private MemberApi: MemberService,
    private ConnectionApi: ConnectionService,
    private ProfileApi: ProfileService,

  ) { 
    let AccessAppToken =  localStorage.getItem("AccessAppToken");
       
    if(AccessAppToken==null){
        this.router.navigate(['/']);
    }
    this._id = localStorage.getItem("_id");
    console.log("_id....",this._id);
   
  }

  ngOnInit() {

    this.getProfileData();

    this.getconnectionData();
  }


  //connection api call 
  



  getProfileData() {
    this.UserProfileImage_url = [];

    this.ProfileApi.getProfileData().subscribe(res => {

      let status = res['status'];

      if (status == true) {
        let userdata = res['user'];

        this._id = userdata._id;
console.log("this_id",this._id);
        let userimage = userdata.userImage;
        for (var i = 0; i < 1; i++) {
          this.UserProfileImage_url.push({ url: userimage[i] });
        }

      }

    });
  }


  getconnectionData() {

    this.connection_result = [];
    this.ConnectionApi.getconnection().subscribe(res => {
      console.log("connection-data", res);

      let conn_data = res['connection'];
console.log("my ID is",this._id);
      for (var c = 0; c < conn_data.length; c++) {
        if(conn_data[c].targetId==this._id){
        this.connection_result.push({
          "targetName": conn_data[c].senderName,
          "targetImage": conn_data[c].senderImage,
          "_id": conn_data[c]._id,
          "unreadMsgCount": conn_data[c].unreadMsgCount,
        });
      }else{
        this.connection_result.push({
          "targetName": conn_data[c].targetName,
          "targetImage": conn_data[c].targetImage,
          "_id": conn_data[c]._id,
          "unreadMsgCount": conn_data[c].unreadMsgCount,
        });
      }
    }

      console.log("connection-array", this.connection_result);


    });
  }

  gotochat(chatId) {
    console.log("chatId", chatId);

    localStorage.setItem("chatId", chatId);

    this.router.navigate(['chat']);

  }






}
