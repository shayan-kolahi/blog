import { Component } from '@angular/core';
import {SvgIconComponent} from 'angular-svg-icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
