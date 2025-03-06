import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }
  isEmpty(value: string):boolean {
    return value !== "";
  }
  isEmptyArr(value: any[]):boolean {
    return value.length !== 0;
  }
  isEmail(email: string): boolean {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email);
  }
}
