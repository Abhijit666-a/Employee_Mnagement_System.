import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../User';
import { userregister } from '../userregister';
import { UserService } from '../Service/user-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  Form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private service: UserService, private router: Router) { }
  ngSignup() {
    if (this.Form.valid) {
      this.service.ngsingup(this.Form.value as any).subscribe((Response: any) => {
        console.log('Registration successful', Response);
        this.router.navigate(['/login']);
      },
        (error) => {
          console.error('Registration failed', error);
        });
    }
    else {
      this.Form.markAllAsTouched();
    }
  }
}
