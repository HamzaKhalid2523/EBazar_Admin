import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @Input('photo') photo = 'assets/images/user-icon.jpg';
  @Output() imagePick = new EventEmitter<string | File>();
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit() {
  }

  onPickImage() {
    this.filePickerRef.nativeElement.click();
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.photo = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }
}
