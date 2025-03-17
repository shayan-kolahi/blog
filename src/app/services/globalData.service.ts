import {Injectable, signal, WritableSignal} from '@angular/core';
import {ApiService} from './api.service';
import {CategoryInterface, TagInterface, UserDataInterface} from '../interface/model.interface';
import {AuthService} from './auth.service';

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
  getAllCategoryData: WritableSignal<CategoryInterface[]> = signal([]);
  getAllTagData: WritableSignal<TagInterface[]> = signal([]);

  constructor(private api: ApiService, private auth: AuthService) {
  }

  getUserDataFn(): void {
    this.api.getUserData().subscribe({
      next: data => {
        this.userData.set(data);
      },
      error: error => {
        this.auth.logout();
        console.error(222, error);
      }
    })
  }

  getAllCategoryDataFn(): void {
    this.api.getAllCategory().subscribe({
      next: data => {
        this.getAllCategoryData.set(data.data);
      },
      error: error => {
        console.error(222, error);
      }
    })
  }

  getAllTagDataFn(): void {
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
