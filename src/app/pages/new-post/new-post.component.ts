import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {ValidationService} from '../../services/validation.service';
import {NgIf} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Router} from '@angular/router';
import {GlobalDataService} from '../../services/globalData.service';

@Component({
  selector: 'app-new-post',
  imports: [
    HeaderComponent,
    FormsModule,
    MultiSelectModule,
    MessageModule,
    ButtonDirective,
    Dialog,
    InputText,
    NgIf,
    ProgressSpinner
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

  constructor(
    private api: ApiService,
    public globalData: GlobalDataService,
    private validationService: ValidationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  addNew(type: string): void {
    this.visible = true;
    this.type = type
  }

  submitAddNew(): void {
    if (this.type === 'category') {
      this.api.addNewCategory(this.AddNewValue).subscribe({
        next: data => {
          this.globalData.getAllCategoryDataFn();
          this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'یک دسته بندی جدید اضافه شد'});
          this.AddNewValue = '';
          this.visible = false;
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
        }
      })
    } else {
      this.api.addNewTag(this.AddNewValue).subscribe({
        next: data => {
          this.globalData.getAllTagDataFn();
          this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'یک تگ جدید اضافه شد'});
          this.AddNewValue = '';
          this.visible = false;
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
        }
      })
    }
  }

  submit(): void {
    if (!this.validationService.isEmpty(this.title) || !this.validationService.isEmpty(this.description) || !this.validationService.isEmptyArr(this.selectedCategory) || !this.validationService.isEmptyArr(this.selectedTag)) {
      this.messageService.add({severity: 'error', summary: 'خطا', detail: 'لطفا همه فیلد ها رو پر کنید'});
      return;
    }
    let selectedCategoryIds: number[] = this.selectedCategory.map(item => item.id);
    let selectedTagIds: number[] = this.selectedTag.map(item => item.id);
    this.api.addPost({
      title: this.title,
      description: this.description,
      categories: selectedCategoryIds,
      tags: selectedTagIds
    }).subscribe({
      next: data => {
        console.log(data);
        this.messageService.add({severity: 'success', summary: 'تبریک', detail: 'پست شما با موفقیت ساخته و آپلود شد'});
        this.router.navigate(['/'], {})

      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'خطا', detail: err.message});
      }
    })
  }

  // uploadImage
  imageUrl: string | ArrayBuffer | null = null;
  isLoading = false; // برای نمایش لودینگ
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  triggerFileInput() {
    if (!this.imageUrl) {
      this.fileInput.nativeElement.click();
    }
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  uploadImage(file: File) {
    this.isLoading = true; // نمایش لودینگ
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        this.imageUrl = reader.result;
        this.isLoading = false; // مخفی کردن لودینگ
      }, 1000); // شبیه‌سازی تأخیر در لود شدن عکس
    };
    reader.readAsDataURL(file);
  }
  removeImage(event: Event) {
    event.stopPropagation(); // جلوگیری از کلیک روی باکس آپلود
    this.imageUrl = null;
    this.fileInput.nativeElement.value = ''; // پاک کردن مقدار input
  }
  // uploadImage

}
