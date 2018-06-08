import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';
import { ProfileService } from '../service/profile/profile.service';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnInit {
  chatId;
  itemCount: number = 4;
  btnText: string = 'Send';
  goalText: string ;
  goals = [];
  UserProfileImage_url = [];
  connection_result = [];
  message_result = [];
  to;
  from;
  private url = 'https://aimerappsocket.herokuapp.com/';
  private socket;
  mesage_dynamic;
  dataRefresher: any;
  sender;
  liveMessage = [];
  _id;
  livemsg;
  constructor( private router: Router,
    private MemberApi:MemberService, 
    private ConnectionApi:ConnectionService,
    private ProfileApi:ProfileService,
    private http: HttpClient
    
  ) { 
    var connection = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };
    this.livemsg=false;
    this.socket = io.connect(this.url, connection);

    console.log("socket", this.socket);
    
    this._id = localStorage.getItem("_id");
    console.log("_id....",this._id);
     this.getconnectionData();
    
    //this.getMessages_live();
  
  }

  ngOnInit() {
    this.itemCount = this.goals.length;
   
    //this.refreshData();
  this.chatId = localStorage.getItem("chatId");
  this.getProfileData();
 // this.getconnectionData();
  this.getMessages(this.chatId);

 this.getMessages_live();
 console.log(" liveMessage", this.liveMessage);
//   this.ConnectionApi.getMessagesio(this.chatId).subscribe((data: string) => {
//     console.log("msg-data",data);
//  });

  }


  getProfileData() {
    this.UserProfileImage_url = [];
    this.ProfileApi.getProfileData().subscribe(res => {
   
     let status = res['status'];
    
      if(status==true){
        let userdata = res['user'];
        this._id = userdata._id;
        let userimage = userdata.userImage;
        for(var i=0; i<1;i++){
          this.UserProfileImage_url.push({url:userimage[i]});
       }

      }
     
     });
 }

 getconnectionData() {

  this.connection_result  = [];
 this.ConnectionApi.getconnection().subscribe(res => {
 // console.log("connection-data",res);

  let conn_data = res['connection'];

  for(var c=0;c<conn_data.length;c++){
    if(conn_data[c]._id==this.chatId){


      if(conn_data[c].targetId==this._id){
        this.connection_result.push({
          "targetName": conn_data[c].senderName,
          "targetImage": conn_data[c].senderImage,
          "_id": conn_data[c]._id,
          "unreadMsgCount": conn_data[c].unreadMsgCount,
          "targetId":conn_data[c].senderId,
        });

        this.to = conn_data[c].targetId;
        this.from = conn_data[c].senderId;
        this.sender = conn_data[c].targetId;

      }else{
        this.connection_result.push({
        
          "targetName": conn_data[c].targetName,
          "targetImage": conn_data[c].targetImage,
          "_id": conn_data[c]._id,
          "unreadMsgCount": conn_data[c].unreadMsgCount,
          "targetId":conn_data[c].targetId,
        });

        this.to = conn_data[c].senderId;
        this.from = conn_data[c].targetId;
        this.sender = conn_data[c].senderId;

      }

          this.to = conn_data[c].senderId;
          this.from = conn_data[c].targetId;

     
 
           this.socket.emit('adduser',this.sender);
  

     this.ConnectionApi.adduser(conn_data[c].senderId).subscribe((data: string) => {
          console.log("user is connected",data);
      });

    }
     }
  
console.log("connection-array", this.connection_result);

  });


}   

getMessages_live(){

  // let mss =  Observable.create((observer) => {
  //   this.socket.on("message", function (data) {
  //     console.log("socket_msg----",data);
  //     this.refresh();
  //  });
  // });

  this.socket.on('message', (data) => {
    console.log("socket_msg----",data);
    let time = new Date();
            let msg_time = time.getTime();
            console.log("msg_time",msg_time);
             let text = data['text'];
             let from = data['from'];
            
             this.livemsg=true;
             
           // this.mesage_dynamic ="text";
         // this.getMessages(this.chatId);

        this.message_result.push({
              "text":text,
              "senderId":from,
              "time":msg_time
        });

      
    });




//  console.log("dataddsfsd",mssss);

  //  this.socket.on("message", function (data) {
  //   console.log("socket_msg----",data);
  //         let time = new Date();
  //         let msg_time = time.getTime();
  //         console.log("msg_time",msg_time);
  //          let text = data['text'];
  //          let from = data['from'];
  //        // this.mesage_dynamic ="text";
  //        //this.refresh();
  //     let arr = [];  
  //     arr.push({
  //           "text":text,
  //           "senderId":from,
  //           "time":msg_time
  //     });
          
  //  });
  
  // this.refresh();
  // console.log(" liveMessage", this.liveMessage);

    // let res =  this.ConnectionApi.getMessages_live();
    // console.log("Live-messge",res);
//   subscribe(res => {
//         console.log("Live-messge",res);
//         let msg_data = res;
// //console.log("-------------");
 
//   let msg_length = msg_data['length'];

//   for(var m=0;m<msg_length;m++){
    
//       let create_date = msg_data[m]._created_at;
//       let time = new Date(create_date);
//       let msg_time = time.getTime();
      
//       this.message_result.push({
//         "text":msg_data[m].text,
//         "senderId":msg_data[m].senderId,
//         "time":msg_time
//      });
    
//    } 
//   });
}

getMessages(chatId): void{
  
this.message_result = [];

 this.ConnectionApi.getMessages(chatId).subscribe(res => {
  console.log("message-data",res);

  let msg_data = res;
//console.log("-------------");
 
  let msg_length = msg_data['length'];

  for(var m=0;m<msg_length;m++){
    if(msg_data[m].connection==this.chatId){

      let create_date = msg_data[m]._created_at;
      let time = new Date(create_date);
      let msg_time = time.getTime();
      
      this.message_result.push({
        "text":msg_data[m].text,
        "senderId":msg_data[m].senderId,
        "time":msg_time
     });
    }  
   } 

  });

  
  console.log("message-array", this.message_result);

}


  addItem() {
  //  console.log("send-text",this.goalText);
      
    let data = {"connectionId":this.chatId,"text":this.goalText};
    this.ConnectionApi.sendMessage(data).subscribe(res => {
    //  console.log("send-text-data",res);
    });

    let paramdata = {"connectionId":this.chatId,"text":this.goalText};

    let sendmsgdata = {
      "text": this.goalText,
      "to": this.to,
      "from":  this.from ,
    };
    let time1 = new Date();
    let msg_time1 = time1.getTime();
    this.message_result.push({
      "text":this.goalText,
      "senderId":this.from,
      "time":msg_time1
});
    

this.ConnectionApi.getMessages(this.chatId).subscribe(res => {
  console.log("message-data",res);});

    this.ConnectionApi.addmessgae(sendmsgdata).subscribe((data: string) => {
      console.log("message is sent",data);
    });




    let time = new Date();
    let msg_time = time.getTime();

    this.goals.push({"text":this.goalText,"time":msg_time});
    this.goalText = '';
    this.itemCount = this.goals.length;

  }

  refresh(){
  setInterval(() => {
    //this.getMessages(this.chatId);
    //Passing the false flag would prevent page reset to 1 and hinder user interaction
  }, 1)
  }
  // refreshData(){
  //   this.dataRefresher =
  //     setInterval(() => {
  //       this.getMessages(this.chatId);
  //       //Passing the false flag would prevent page reset to 1 and hinder user interaction
  //     }, 3000);  
  // }
 

}
