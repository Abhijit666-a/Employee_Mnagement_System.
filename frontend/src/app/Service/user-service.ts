import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../User';
import { userregister } from '../userregister';

@Injectable({
  providedIn: 'root',
})
export class UserService {

 private appurl = "https://employee-mnagement-system-qrbr.onrender.com/";
  constructor(private http: HttpClient) { }

  ngsingup(users: userregister) {
    return this.http.post(this.appurl + '/register', users)
  }

  ngLogin(userlogin: User) {
    return this.http.post(this.appurl + '/login', userlogin);
  }

  ngupdate(password: User) {
    return this.http.put(this.appurl + "/updatepassword", password)
  }

  profile(username: any) {
    return this.http.get(this.appurl + "/profile/" + username)
  }
  ngGoogleLogin(googleUserData: any) {
    return this.http.post(this.appurl + '/google-login', googleUserData);
  }
}
