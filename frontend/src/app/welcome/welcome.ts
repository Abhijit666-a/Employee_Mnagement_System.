import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(){
    setTimeout(() => {
      this.router.navigate(['/home']);

    }, 3000);
  }
}
