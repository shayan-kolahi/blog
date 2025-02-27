import { Component } from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SvgIconComponent, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public auth: AuthService) {
  }
}
