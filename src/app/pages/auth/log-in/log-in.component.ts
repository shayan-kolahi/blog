import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {Password} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {ValidationService} from '../../../services/validation.service';
import {MessageService} from 'primeng/api';
import {ApiService} from '../../../services/api.service';
import {LogInDataInterface} from '../../../interface/global';


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
    private messageService: MessageService,
    private api: ApiService,
    private router: Router) {
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
    this.logInData.email = this.logInData.email.trim();
    this.logInData.password = this.logInData.password.trim();
    this.api.logIn(this.logInData).subscribe({
      next: (data: any): void => {
        if (data.success) {
          localStorage.setItem('token', data.data.token)
          this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'ورود شما با موفقیت انجام شد'});
          this.router.navigate(['/'], {})
        }
      },
      error: (err: any): void => {
        this.messageService.add({severity: 'error', summary: 'خطا', detail: err.error.message});
      }
    })
  }
}
