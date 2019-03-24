import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class ChatService {

  private socket = io('http://localhost:4040');

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    const observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    const observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  requestMatch(data) {
    this.socket.emit('match', data);
  }

  roomCreated() {
    const observable = new Observable<{ roomId: string }>(observer => {
      this.socket.on('roomCreated', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }
}