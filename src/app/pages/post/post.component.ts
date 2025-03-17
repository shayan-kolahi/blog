import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-post',
  imports: [
    HeaderComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  constructor(private router: ActivatedRoute) {
    this.router.paramMap.subscribe(params => {
      const id: string|null = params.get('id');
      console.log(id); // 123
    });
  }
}
