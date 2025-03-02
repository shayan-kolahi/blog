import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonDirective} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {ApiService} from '../../services/api.service';
import {InputText} from 'primeng/inputtext';
import {MessageService} from 'primeng/api';
import {CategoryInterface, TagInterface} from '../../interface/global';

@Component({
  selector: 'app-new-post',
  imports: [
    HeaderComponent,
    FormsModule,
    MultiSelectModule,
    MessageModule,
    ButtonDirective,
    Dialog,
    InputText
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent implements OnInit {
  title: string = '';
  description: string = '';
  selectedCategory: CategoryInterface[] = [];
  selectedTag: TagInterface[] = [];

  visible: boolean = false;
  AddNewValue: string = '';
  type: string = '';


  getAllCategory: any[] = [];
  getAllTag: any[] = [];

  constructor(
    private api: ApiService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.api.getAllCategory().subscribe((data: any): void => {
      this.getAllCategory = data.data
    })
    this.api.getAllTag().subscribe((data: any): void => {
      this.getAllTag = data.data
    })
  }

  addNew(type: string): void {
    this.visible = true;
    this.type = type
  }

  submitAddNew(): void {
    if (this.type === 'category') {
      this.api.addNewCategory(this.AddNewValue).subscribe({
        next: data => {
          this.api.getAllCategory().subscribe((data: any): void => {
            this.getAllCategory = data.data;
            this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'یک دسته بندی جدید اضافه شد'});
            this.visible = false;
          })
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
        }
      })
    } else {
      this.api.addNewTag(this.AddNewValue).subscribe({
        next: data => {
          this.api.getAllTag().subscribe((data: any): void => {
            this.getAllTag = data.data;
            this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'یک تگ جدید اضافه شد'});
            this.visible = false;
          })
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
        }
      })
    }
  }

  submit(): void {
    this.api.addPost({
      title: this.title,
      description: this.description,
      categories: this.selectedCategory,
      tags: this.selectedTag
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
      }
    })
  }
}
