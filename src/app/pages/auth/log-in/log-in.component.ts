import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';

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

}
