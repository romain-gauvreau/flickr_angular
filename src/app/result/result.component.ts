import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { PhotosInterface } from '../photos-interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchPhotoUrls : Array<String> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key="
    url = url + "3916944f55d2c8f5a6f3c7e2b0c37ccb" + "&format=json&nojsoncallback=1"; 
    this.http.get<PhotosInterface>(url).subscribe(data => {
      this.displayResultImages(data.photos.photo);
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
    }); 
  }

  displayResultImages(photos : any){ 
    this.searchPhotoUrls = []; // clean old photos
    if(photos.length != 0){
      console.log(photos);
      for(let i = 0; i < photos.length; i++){
        let photo = photos[i];
        // console.log("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
        this.searchPhotoUrls.push("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
        // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
        if(i >= 9){ // stop at the 10th image
          i = photos.length;
        }
      }
    }
  }

}
