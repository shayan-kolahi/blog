import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../environment/environment.token';
import {Observable} from 'rxjs';
import {LogInDataInterface, RegisterDataInterface} from '../interface/global';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient,@Inject(ENVIRONMENT) private env: any) { }
  register(registerData: RegisterDataInterface): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/register', registerData)
  }
  logIn(logInData: LogInDataInterface): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/login', logInData)
  }
  getAllCategory(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'api/category')
  }
  getAllTag(): Observable<any> {
    return this.http.get(this.env.apiUrl + 'api/tag')
  }
  addNewCategory(name: string): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/category', {name: name})
  }
  addNewTag(name: string): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/tag', {name: name})
  }
  addPost(data: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/post', data)
  }
}
