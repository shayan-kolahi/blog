import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {ValidationService} from '../../../services/validation.service';
import {MessageService} from 'primeng/api';

interface LogInDataInterface {
  email: string;
  password: string;
}

@Component({
  selector: 'app-log-in',
  imports: [
    FormsModule,
    InputText,
    ButtonDirective,
    Password,
    RouterLink
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  logInData: LogInDataInterface = {
    email: '',
    password: '',
  };

  constructor(
    private validationService: ValidationService,
    private messageService: MessageService) {
  }


  isStrongPassword(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  }
  submit(): void {
    if (!this.validationService.isEmpty(this.logInData.email) || !this.validationService.isEmpty(this.logInData.password)) {
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا همه فیلد ها رو پر کنید'});
      return;
    }
    if (!this.validationService.isEmail(this.logInData.email)){
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا فیلد ایمیل را درست وارد کنید'});
      return;
    }
    console.log(this.logInData)
  }
}
