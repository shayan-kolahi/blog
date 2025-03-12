import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {MessageService} from 'primeng/api';
import {GlobalDataService} from '../../services/globalData.service';
import {PostDataInterface} from '../../interface/model.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private globalData: GlobalDataService
  ) {
  }

  postData: WritableSignal<PostDataInterface[]> = signal([]);

  ngOnInit(): void {
    this.api.getPost().subscribe({
      next: data => {
        this.preparePostData(data.data)
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
      }
    })
  }

  preparePostData(postData: PostDataInterface[]): void {
    const categoryMap = new Map(this.globalData.getAllCategoryData().map((item) => [item.name, item]));
    const tagMap = new Map(this.globalData.getAllTagData().map((item) => [item.name, item]));
    postData.forEach((item: PostDataInterface) => {
      item.categoriesArr = item.categories.map(category => categoryMap.get(category)).filter(Boolean);
      item.tagsArr = item.tags.map(tag => tagMap.get(tag)).filter(Boolean);
      item.created_at = this.timeAgo(item.created_at);
    });
    this.postData.set(postData);
  }

  timeAgo(createdAt: string): string {
    const jalaliDate = this.convertToJalali(createdAt);
    const diffDays = Math.floor((new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const dayText = diffDays === 0 ? "امروز" : `${diffDays} روز پیش`;
    return `${jalaliDate} ( ${dayText} )`;
  }

  convertToJalali(isoDate: string): string {
    const date = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {year: 'numeric', month: '2-digit', day: '2-digit'});
    return formatter.format(date);
  }
}
