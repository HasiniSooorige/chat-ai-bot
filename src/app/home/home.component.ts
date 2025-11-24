
import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages: Message[] = [];
  value: string | undefined;
  isTyping: boolean = false;
  time?: string;

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.conversation.subscribe((val) => {
      this.messages = val;
      this.chatService.currentMessages = val; // keep track inside service
    });
  }

  sendMessage() {
    if (!this.value) return;

    this.isTyping = true;

    // Only call the service; don't push message here
    this.chatService.getBotAnswer(this.value);

    setTimeout(() => {
      this.isTyping = false;
      this.value = '';
    }, 1000);
  }



}


