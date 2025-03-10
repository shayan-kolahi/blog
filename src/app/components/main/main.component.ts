import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) {}
  postData: WritableSignal<any> = signal([]);
  ngOnInit(): void {
    this.api.getPost().subscribe({
      next: data => {
        this.postData.set(data);
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
      }
    })
  }
}
