import { Component } from '@angular/core';
import { UserService } from '../Service/user-service';
import { User } from '../User';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './update-password.html',
  styleUrl: './update-password.css',
})
export class UpdatePassword {
  form  = new FormGroup({
    username: new FormControl('',[Validators.required]),
    oldpassword : new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private userSevice: UserService, private router: Router) { }
  onReset() {
    if(this.form.valid){
      this.userSevice.ngupdate(this.form.value as any).subscribe((Response: any) => {
        console.log(Response);
        if (Response != null) {
          alert("Password update successful");
          this.router.navigate(['/login']);
        } else {
          alert("Old password incorrect User not found");
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
