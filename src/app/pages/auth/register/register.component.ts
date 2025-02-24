import {Component, Inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ValidationService} from '../../../services/validation.service';
import {NgClass} from '@angular/common';
import {MessageService} from 'primeng/api';
import {ENVIRONMENT} from '../../../../environment/environment.token';
import {ApiService} from '../../../services/api.service';

interface RegisterDataInterface {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}

@Component({
  selector: 'app-register',
  imports: [
    ButtonDirective,
    InputText,
    Password,
    RouterLink,
    FormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData: RegisterDataInterface = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private validationService: ValidationService,
    private messageService: MessageService,
    private api: ApiService,
    private router: Router) {}


  isStrongPassword(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  }
  submit(): void {
    if (!this.validationService.isEmpty(this.registerData.name) ||
      !this.validationService.isEmpty(this.registerData.email) ||
      !this.validationService.isEmpty(this.registerData.password) ||
      !this.validationService.isEmpty(this.registerData.password_confirmation)) {
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا همه فیلد ها رو پر کنید'});
      return;
    }
    if (!this.validationService.isEmail(this.registerData.email)){
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا فیلد ایمیل را درست وارد کنید'});
      return;
    }
    if (!this.isStrongPassword(this.registerData.password)) {
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'رمز عبور ضعیفه، لطفاً یه قوی‌تر انتخاب کن.'});
      return;
    }
    if (this.registerData.password !== this.registerData.password_confirmation){
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'رمز و تکرار رمز برابر نیست'});
      return;
    }

    this.api.register(this.registerData).subscribe((data: any): void => {
      console.log(data);
      if (data.success) {
        this.router.navigate(['/logIn'], {})
      }
    })

  }
}
