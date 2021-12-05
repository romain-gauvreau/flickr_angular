import { Component, Directive, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchPhotoUrls : Array<String> = [];

  constructor() { }

  ngOnInit(): void {
  }

  displayResultImages(photos : Array<any>){ 
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
