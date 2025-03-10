import {Component, OnInit} from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {GlobalDataService} from './services/globalData.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private primeng: PrimeNG, public globalData: GlobalDataService) {
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
  ngOnInit(): void {
    this.globalData.getUserDataFn();
  }
}
