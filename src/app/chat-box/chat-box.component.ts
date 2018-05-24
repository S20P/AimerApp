import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  current_token;
  UserProfileImage_url = [];
  token = "EAAHqWDZAUh7QBAPDseC2gBIKXEbNOpReaiCPqbqzLZCUDbgt7XdznNsMBGyzR58bhfFgjCUc33LD31p2KQ59v7UjnXSZAc0ZCNJvrBYfO8dZACmIORO02RRStrfqRZAbcOhCPu0k2n2FjaFpZAZAWtaG2zq6EYiINqrXGfup9y8Wh7PfxvY8b3a7RmxkVve8j19EchnIgSfllAZDZD";
  connection_result = [];
  constructor( private router: Router,
               private MemberApi:MemberService,
               private ConnectionApi:ConnectionService,
             ) { }

  ngOnInit() {
    
    let usercheck = JSON.parse(localStorage.getItem("usercheck"));
    let usermember = JSON.parse(localStorage.getItem("usermember"));

    if(usercheck.userlogin=="false"){
      this.router.navigate([' ']);
    }
    this.getmemberData();
    this.current_token = usercheck.token;
   // let userimage = usermember.userImage;
 //   this.UserProfileImage_url = userimage[0];

   this.getconnectionData(this.token);
  }


//connection api call 
getconnectionData(token) {

   this.connection_result  = [];
  this.ConnectionApi.getconnection(token).subscribe(res => {
   console.log("connection-data",res);

   let conn_data = res['connection'];

   for(var c=0;c<conn_data.length;c++){
       this.connection_result.push({
         "targetName":conn_data[c].targetName,
         "targetImage":conn_data[c].targetImage,
         "_id":conn_data[c]._id,
         "unreadMsgCount":conn_data[c].unreadMsgCount,
      });
      }
   
console.log("connection-array", this.connection_result);


   });
}   



  getmemberData() {
    this.UserProfileImage_url = [];
    
    this.MemberApi.getmember().subscribe(res => {
     console.log("member-data",res);
     let oldUser = res['oldUser'];
     let status = res['status'];

     if(oldUser==false&&status==true){
       this.router.navigate(['create-profile']);
     }
     else{
      if(oldUser==true){
        let userdata = res['user'];
        let userimage = userdata.userImage;
        for(var i=0; i<1;i++){
          this.UserProfileImage_url.push({url:userimage[i]});
       }

      }
     }
     });
 }


  

 gotochat(chatId){
     console.log("chatId",chatId);

     localStorage.setItem("chatId",chatId);
     
     this.router.navigate(['chat']);

 }






}
