import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable()
export class ConnectionService {

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJlNDE1OGUwMWMyZDAwZDhiYjQxNjEiLCJmYWNlYm9va0lkIjoiMTI0NzAxNDIwNTM1MjI5NyIsInVzZXJuYW1lIjoiTmloYWwgRGVzYWkiLCJleHAiOjE1Mjc1NDk0NzYuMjE2LCJpYXQiOjE1MjY0Njk0NzZ9.rLMgdxGljcM2dbKRDJU8sBsCjsunzCBdbOtJs90vJsk";

  private url = 'https://aimerappsocket.herokuapp.com/';

  getconn_url: string = "https://aimerappdev.herokuapp.com/connection/getConnection";
  getMessages_url: string = "https://aimerappdev.herokuapp.com/chat/getMessages";
  sendMessage_url: string = "https://aimerappdev.herokuapp.com/chat/sendMessage";


  private socket;

  constructor(private http: HttpClient) {

    var connection = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"]
    };

    this.socket = io.connect(this.url, connection);

    console.log("socket", this.socket);

    
  }

  public adduser = (senderId) => {
    return Observable.create((observer) => {
      this.socket.emit('adduser', '5abe4158e01c2d00d8bb4161');
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



  getconnection(token) {

    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer ' + this.token);

    return this.http.get(this.getconn_url, { headers: headers });

  }


  getMessages(connectionId) {

    let data = { "connectionId": connectionId };

    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer ' + this.token);
    return this.http.post(this.getMessages_url, data, { headers: headers });

  }


  sendMessage(data) {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer ' + this.token);
    return this.http.post(this.sendMessage_url, data, { headers: headers });
  }


}
