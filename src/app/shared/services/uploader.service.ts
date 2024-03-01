import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor(private http: HttpClient) {
  }


  uploadImage(file: File): Observable<{ 'file-name': string }> {
    const formData = new FormData();
    formData.set('profile-photo', file)
    return this.http.post<{ 'file-name': string }>('files/profile', formData, {})
  }

  getFileFromUrl(url: string) {
    return this.http.get(url, {responseType: "blob"}).pipe(
      map((imageBlob) => new File([imageBlob], 'imageFileName.jpg', {type: 'image/jpeg'}))
    )
  }
}
