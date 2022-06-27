import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../helper/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseImageHandler {
  task: AngularFireUploadTask;

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage
  ) {}

  public async uploadProfileImg(credentials, folder) {
    const token = await this.authService.getLoginToken();

    if(credentials.photoAvatar instanceof File || credentials.photoAvatar instanceof Blob) {

      const uploadObs = this.uploadFileAndGetMetadata(
        credentials.photoAvatar,
        token,
        folder
      );

      return uploadObs.downloadUrl$;
    } else {
      const obs = Observable.create(obs => {
        obs.next(credentials.photoAvatar);
      });
      return obs;
    }
  }

  public async uploadMartShopsDocs(credentials, folder) {
    const token = await this.authService.getLoginToken();
    const obsData = [];

    credentials.companyDocs.forEach(async (element: any) => {
      if(element instanceof File || element instanceof Blob) {

        const uploadObs = await this.uploadFileAndGetMetadata(
          element,
          token,
          folder
        );

        obsData.push(uploadObs.downloadUrl$);
      } else {
        const obs = Observable.create(obs => {
          obs.next(credentials.photoAvatar);
        });
        obsData.push(obs);
      }
    });

    return obsData;
  }

  uploadFileAndGetMetadata(fileToUpload: any, token, folder) {
    const filePath = `public/img/${folder}/${folder}-${Date.now()}-${token}`;
    const ref = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, fileToUpload);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(this.task, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL())
    );
  }

  deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
