import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChatboxComponent } from "./chatbox/chatbox.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, ChatboxComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  showNavbar = false;
  isLoggedIn = false;
  userName = '';

  constructor(private router: Router) {
  this.router.events.subscribe(() => {
    const url = this.router.url;
    this.showNavbar = !(url.includes('login') || url.includes('register'));
    this.checkLoginStatus(); 
  });
}

checkLoginStatus() {
  this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  this.userName = localStorage.getItem('userName') || 'User';
}

    ngOnInit(): void {
    this.checkLoginStatus();
    this.router.events.subscribe(()=>{
      this.checkLoginStatus();
    })
  }

 
  logout(){
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
