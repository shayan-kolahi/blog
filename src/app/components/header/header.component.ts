import { Component } from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {GlobalDataService} from '../../services/globalData.service';

@Component({
  selector: 'app-header',
  imports: [SvgIconComponent, RouterLink, NgIf, Menu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'پروفایل',
      icon: 'pi pi-user',
      route: '/'
    },
    {
      label: 'تنظیمات',
      icon: 'pi pi-cog',
      route: '/'
    },
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: (): void => {
        this.authService.logout();
      }
    }
  ];
  constructor(public auth: AuthService, public globalData: GlobalDataService, public authService: AuthService) {
  }
}
