import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PhotosInterface} from "../models/photos-interface";
import {PhotoInterface} from "../models/photo-interface";
import {DetailsInterface} from "../models/details-interface";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private http: HttpClient,) {
  }

  public getInterestingPhotos(): Observable<PhotoInterface[]> {
    return this.http
      .get<PhotosInterface>(environment.apiURL, {
        params: {
          api_key: environment.apiKey,
          method: 'flickr.interestingness.getList',
          format: 'json',
          nojsoncallback: '1',
        },
      })
      .pipe(map((response) => response.photos.photo));
  }

  public getPhotoDetailsById(id: number): Observable<DetailsInterface> {
    return this.http
      .get<DetailsInterface>(environment.apiURL, {
        params: {
          api_key: environment.apiKey,
          method: 'flickr.photos.getInfo',
          format: 'json',
          nojsoncallback: '1',
          photo_id: id,
        },
      });
  }

  public searchPhotosByText(text: string): Observable<PhotosInterface> {
    return this.http
      .get<PhotosInterface>(environment.apiURL, {
        params: {
          api_key: environment.apiKey,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          text: text,
        },
      });
  }

  public getImageURLFromPhoto(photo: PhotoInterface) {
    return `${environment.imageServerURL}${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }

  public getOtherPhotosFromUser(user_nsid: string, page = 1, per_page = 10): Observable<PhotosInterface> {
    return this.http
      .get<PhotosInterface>(environment.apiURL, {
        params: {
          api_key: environment.apiKey,
          method: 'flickr.people.getPublicPhotos',
          format: 'json',
          user_id: user_nsid,
          page: page,
          per_page: per_page,
          nojsoncallback: '1',        // Je viens de rester bloqué 1h30 sur ca c'est très grave
        },
      });
  }
}
