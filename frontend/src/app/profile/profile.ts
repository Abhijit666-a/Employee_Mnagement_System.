import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{
  userData : any;
  constructor(private profileSerive : UserService){}
  ngOnInit(): void {
    const currentUser = localStorage.getItem('userName')
      if(currentUser){
        this.profileSerive.profile(currentUser).subscribe((Response : any)=>{
          console.log(Response)
          this.userData = Response
        });
      }
    
  }

}
