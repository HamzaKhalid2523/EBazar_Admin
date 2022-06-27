import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-multi-image-picker',
  templateUrl: './multi-image-picker.component.html',
  styleUrls: ['./multi-image-picker.component.scss'],
})
export class MultiImagePickerComponent implements OnInit {
  @Input('photos') photos = [];
  @Output() imagePick = new EventEmitter<string | File>();
  @Output() removeImage = new EventEmitter<any>();
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit() {}

  onPickImage() {
    this.filePickerRef.nativeElement.click();
  }

  onFileChosen(event: Event) {
    this.photos = [];
    const pickedFile: any = (event.target as HTMLInputElement).files;
    if (!pickedFile) {
      return;
    }

    var filesAmount = (event.target as HTMLInputElement).files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.photos.push(event.target.result);
      };

      reader.readAsDataURL((event.target as HTMLInputElement).files[i]);
    }
    this.imagePick.emit(pickedFile);
  }

  removeImageEvent(index) {
    this.photos.splice(index, 1);
    this.removeImage.emit(index);
  }
}
