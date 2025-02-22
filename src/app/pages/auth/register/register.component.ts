import {Component} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ValidationService} from '../../../services/validation.service';
import {NgClass} from '@angular/common';
import {MessageService} from 'primeng/api';

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
    private messageService: MessageService) {
  }

  submit(): void {
    if (!this.validationService.isEmpty(this.registerData.name) ||
      !this.validationService.isEmpty(this.registerData.email) ||
      !this.validationService.isEmpty(this.registerData.password) ||
      !this.validationService.isEmpty(this.registerData.password_confirmation)) {
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا همه فیلد ها رو پر کنید'});
      return;
    }
    console.log(111)
  }
}
