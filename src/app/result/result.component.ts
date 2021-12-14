import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {


  searchPhotos : Array<{
                          id: number;
                          title: string;
                          url: string;
                        }> = [];

  constructor() { }

  ngOnInit(): void {
  }

  displayResultImages(photos : any, max : number){
    this.searchPhotos = []; // clean old photos
    if(photos.length != 0){
      console.log(photos);
      for(let i = 0; i < photos.length; i++){
        let photo = photos[i];
        // console.log("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
        this.searchPhotos.push({id: photo.id, title: photo.title, url: "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"});
        // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
        if(i >= (max-1)){ // stop at the 10th image
          i = photos.length;
        }
      }
    }
  }

}
