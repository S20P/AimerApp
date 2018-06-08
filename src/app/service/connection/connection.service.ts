import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable()
export class ConnectionService {

  private url = 'https://aimerappsocket.herokuapp.com/';

  getconn_url: string = "https://aimerappdev.herokuapp.com/connection/getConnection";
  getMessages_url: string = "https://aimerappdev.herokuapp.com/chat/getMessages";
  sendMessage_url: string = "https://aimerappdev.herokuapp.com/chat/sendMessage";

  private socket;
  AccessAppToken;
  
  constructor(private http: HttpClient) {

    var connection = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };

    this.socket = io.connect(this.url, connection);

    console.log("socket", this.socket);
    this.AccessAppToken = localStorage.getItem("AccessAppToken");
    
     }

  public adduser = (senderId) => {
    return Observable.create((observer) => {
      this.socket.emit('adduser', senderId);
    });
  }

  public addmessgae = (data) => {
   this.socket.emit('add-message', data);
    return Observable.create((observer) => {
      this.socket.on("message", function (data) {
        console.log("socket_msg----",data);
     });
    });
  }



  getconnection() {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.AccessAppToken);

    return this.http.get(this.getconn_url, { headers: headers });

  }
  getMessages_live(){

    var res = [];
       this.socket.on("message", function (data) {
      console.log("socket_msg----",data);
       res.push(data);
      });
  }

  getMessages(connectionId) {

    let data = { "connectionId": connectionId };

    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.AccessAppToken);
    return this.http.post(this.getMessages_url, data, { headers: headers });

  }

  sendMessage(data) {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.AccessAppToken);
    return this.http.post(this.sendMessage_url, data, { headers: headers });
  }


}
