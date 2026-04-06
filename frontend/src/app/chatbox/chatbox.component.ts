import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '../Service/ai.service';

@Component({
  selector: 'app-chatbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css',
})
export class ChatboxComponent {
  isChatOpen = false;
  userMessage = '';
  messages: { text: string; sender: 'user' | 'ai' }[] = [
    { text: 'Hello! How can I assist you today?', sender: 'ai' }
  ];


  constructor(private aiService: AiService) { }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    const currentMessage = this.userMessage;
    this.messages.push({ text: currentMessage, sender: 'user' });
    this.userMessage = '';

    this.aiService.postAiMessage(currentMessage).subscribe({
      next: (response: string) => {
        this.messages.push({ text: response, sender: 'ai' });
        this.scrollToBottom();
      },
      error: (err: any) => {
        console.error('AI Error:', err);
        // This triggers if the backend is down or returns an error
        this.messages.push({ text: 'Sorry, trouble connecting to server.', sender: 'ai' });
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatBody = document.querySelector('.chat-body');
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 100);
  }
}
