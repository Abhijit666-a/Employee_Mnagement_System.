import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { User } from '../User';
import { UserService } from '../Service/user-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  user: User = {
    username: '',
    password: ''
  }
  constructor(private Service: UserService, private router: Router) { }
  ngLogin() {
    this.Service.ngLogin(this.user).subscribe(
      (res: any) => {
        if (res != null) {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('userName', res.name || res.username);
          localStorage.setItem('role', res.role);
          this.router.navigate(['/employee']);
        } else {
          alert('Invalid username/email or password');
        }
      });
  }
  ngOnInit() {
    if ((window as any).google) {
      this.initializeGoogleLogin();
    } else {
      (window as any).onGoogleLibraryLoad = () => {
        this.initializeGoogleLogin();
      };
    }
  }
  initializeGoogleLogin() {
    (window as any).google.accounts.id.initialize({
      client_id: "168089628955-a66624tue7pu4d9ectgf7qcjgu9bnfbu.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this)
    });
    (window as any).google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large", text: "signin_with", width: 290 }
    );
  }

  handleCredentialResponse(response: any) {
    const userDetails = JSON.parse(atob(response.credential.split('.')[1]));

    const googleUserData = {
      username: userDetails.name,
      email: userDetails.email,
      role: 'USER'
    };

    this.Service.ngGoogleLogin(googleUserData).subscribe((res: any) => {
      if (res != null) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', res.username || res.name);
        localStorage.setItem('role', res.role);
        this.router.navigate(['/employee']);
      }
    });
  }
}

