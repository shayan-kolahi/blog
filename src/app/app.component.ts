import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
