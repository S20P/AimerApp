import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../service/member/member.service';
import { ConnectionService } from '../service/connection/connection.service';

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
  current_token;
  UserProfileImage_url = [];
  connection_result = [];
  message_result = [];
  to;
  from;
  token = "EAAHqWDZAUh7QBAPDseC2gBIKXEbNOpReaiCPqbqzLZCUDbgt7XdznNsMBGyzR58bhfFgjCUc33LD31p2KQ59v7UjnXSZAc0ZCNJvrBYfO8dZACmIORO02RRStrfqRZAbcOhCPu0k2n2FjaFpZAZAWtaG2zq6EYiINqrXGfup9y8Wh7PfxvY8b3a7RmxkVve8j19EchnIgSfllAZDZD";
  
  constructor( private router: Router,private MemberApi:MemberService, private ConnectionApi:ConnectionService,) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    let usercheck = JSON.parse(localStorage.getItem("usercheck"));
    let usermember = JSON.parse(localStorage.getItem("usermember"));

    if(usercheck.userlogin=="false"){
      this.router.navigate([' ']);
    }
   
    this.current_token = usercheck.token;
    //let userimage = usermember.userImage;
    //this.UserProfileImage_url = userimage[0];

  this.chatId = localStorage.getItem("chatId");
  this.getmemberData();
  this.getconnectionData(this.token);
  this.getMessages(this.chatId);


//   this.ConnectionApi.getMessagesio(this.chatId).subscribe((data: string) => {
//     console.log("msg-data",data);
//  });





  }





  getmemberData() {
    this.UserProfileImage_url = [];
    this.MemberApi.getmember().subscribe(res => {
    // console.log("member-data",res);
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

 getconnectionData(token) {

  this.connection_result  = [];
 this.ConnectionApi.getconnection(token).subscribe(res => {
 // console.log("connection-data",res);

  let conn_data = res['connection'];

  for(var c=0;c<conn_data.length;c++){
    if(conn_data[c]._id==this.chatId){
      this.connection_result.push({
        "targetName":conn_data[c].targetName,
        "targetImage":conn_data[c].targetImage,
        "_id":conn_data[c]._id,
        "targetId":conn_data[c].senderId,
     });
 
     this.to = conn_data[c].targetId;
     this.from = conn_data[c].senderId;

     this.ConnectionApi.adduser(conn_data[c].senderId).subscribe((data: string) => {
          console.log("user is connected",data);
      });

    }
     }
  
console.log("connection-array", this.connection_result);

  });


}   



getMessages(chatId){

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
    
    this.ConnectionApi.addmessgae(sendmsgdata).subscribe((data: string) => {
      console.log("message is sent",data);
    });

    let time = new Date();
    let msg_time = time.getTime();

    this.goals.push({"text":this.goalText,"time":msg_time});
    this.goalText = '';
    this.itemCount = this.goals.length;
  }
}
