import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {

  user: string;
  room: string;
  messageText: string;
  messageArray: Array<{ user: string, message: string }> = [];

  constructor(private chatService: ChatService) {
    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));
    this.chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));
    this.chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
    this.chatService.roomCreated()
      .subscribe(data => this.messageArray.push({user: 'Antariksh', message: data.roomId}));
  }

  join() {
    this.chatService.joinRoom({ user: this.user, room: 'room1' });
  }

  leave() {
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    // this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    this.chatService.sendMessage({user: `Ant`, message: `Messaggge`});
  }

  requestMatch() {
    this.chatService.requestMatch('Client 1');
  }
}
