import { Component, Directive, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchPhotoUrl : string = "";

  constructor() { }

  ngOnInit(): void {
  }

  displayResultImages(photos : Array<any>){ 
    if(photos.length != 0){
      let photo = photos[0];
      // console.log("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
      this.searchPhotoUrl = "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
    }
  }

}
