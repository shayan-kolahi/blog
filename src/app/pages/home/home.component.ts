import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {MainComponent} from "../../components/main/main.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-home',
    imports: [
        HeaderComponent,
        MainComponent,
        SidebarComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
