import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {HeaderComponent} from './components/header/header.component';
import {MainComponent} from './components/main/main.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities'
        }
      }
    })
  }
}
