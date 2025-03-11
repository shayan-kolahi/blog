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

interface getAllCategoryDataInterface {
  id: number,
  name: string,
  parent_id: number
}

interface getAllTagDataInterface {
  id: number,
  name: string
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
  getAllCategoryData: WritableSignal<getAllCategoryDataInterface[]> = signal([]);
  getAllTagData: WritableSignal<getAllTagDataInterface[]> = signal([]);

  constructor(private api: ApiService) {}

  getUserDataFn() {
    this.api.getUserData().subscribe({
      next: data => {
        this.userData.set(data);
      },
      error: error => {
        console.error(222, error);
      }
    })
  }

  getAllCategoryDataFn() {
    this.api.getAllCategory().subscribe({
      next: data => {
        this.getAllCategoryData.set(data.data);
      },
      error: error => {
        console.error(222, error);
      }
    })
  }
  getAllTagDataFn() {
    this.api.getAllTag().subscribe({
      next: data => {
        this.getAllTagData.set(data.data);
      },
      error: error => {
        console.error(222, error);
      }
    })
  }
}
