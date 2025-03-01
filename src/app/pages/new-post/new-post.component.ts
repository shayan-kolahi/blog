import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-new-post',
  imports: [
    HeaderComponent
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {

}
