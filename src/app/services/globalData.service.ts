import {Injectable, signal, WritableSignal} from '@angular/core';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';

interface UserDataInterface {
  id: number,
  type: string,
  name: string,
  email: string,
  email_verified_at: any,
  profile_image_url: any,
  created_at: string,
  updated_at: string
}

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  userData: WritableSignal<UserDataInterface> = signal({
    id: 0,
    type: '',
    name: '',
    email: '',
    email_verified_at: '',
    profile_image_url: '',
    created_at: '',
    updated_at: ''
  });

  constructor(public authService: AuthService, private api: ApiService) {}

  getUserDataFn() {
    if (this.authService.isAuthenticated()){
      this.api.getUserData().subscribe({
        next: data => {
          console.log(222, data);
          this.userData.set(data);
        },
        error: error => {
          console.error(222, error);
        }
      })
    }
  }
}
