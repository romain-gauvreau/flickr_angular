import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {FlickrService} from "../shared/services/flickr.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number;
  title: string = "Chargement en cours...";
  url: string = "";

  constructor(private flickrService: FlickrService, private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.flickrService.getPhotoDetailsById(Number(this.id)).subscribe((data) => {
      this.url = this.flickrService.getImageURLFromPhoto(data.photo);
      this.title = data.photo.title._content;
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
  }

}
