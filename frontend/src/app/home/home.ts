import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'app-home',
  imports: [RouterLink,Dashboard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router : Router){}
getStarted(){
  const status = localStorage.getItem('isLoggedIn');
  if(status === 'true'){
    this.router.navigate(['/employee']);
  }else{
    this.router.navigate(['login']);
  }
}
}
