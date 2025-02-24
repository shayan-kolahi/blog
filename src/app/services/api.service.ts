import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../environment/environment.token';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient,@Inject(ENVIRONMENT) private env: any) { }
  register(registerData: any): Observable<any> {
    return this.http.post(this.env.apiUrl + 'api/register', registerData)
  }
}
