import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotosInterface} from '../shared/models/photos-interface';
import {ResultComponent} from '../result/result.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoInterface} from "../shared/models/photo-interface";
import {FlickrService} from "../shared/services/flickr.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string = "";
  photos: PhotoInterface[] = [];

  constructor(private flickrService: FlickrService) {
  }

  public ngOnInit() {
    document.getElementById("search")!.addEventListener('keydown', e => this.detectEnter(e));
    this.flickrService.getInterestingPhotos().subscribe((photos) => {
      this.photos = photos;
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
  }

  public detectEnter(event : any){
    const key = event.key;
    if(event.key == "Enter"){
      this.submitSearch();
    }
  }

  public submitSearch() {
    this.flickrService.searchPhotosByText(this.search).subscribe((data) => {
      this.photos = data.photos.photo;
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
  }

  public getImageURLFromPhoto(photo: PhotoInterface) {
    return this.flickrService.getImageURLFromPhoto(photo);
  }
}
