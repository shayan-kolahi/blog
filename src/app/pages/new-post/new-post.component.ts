import {Component} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  selector: 'app-new-post',
  imports: [
    HeaderComponent,
    FormsModule,
    MultiSelectModule,
    MessageModule
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  title: any;
  description: any;
  text: any;
  cities: any[] | undefined = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
  ];
  selectedCities: any;
}
