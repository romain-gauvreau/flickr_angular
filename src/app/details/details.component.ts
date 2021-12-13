import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {FlickrService} from "../shared/services/flickr.service";
// TODO change this shit
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: number;
  title: string = "Chargement en cours...";
  url: string = "";

  owner_username: string = "";
  owner_realname: string = "";
  owner_location: string = "";

  description: string = "";
  date_posted = new Date(0);
  date_taken: string = "";
  date_lastupdate = new Date(0);

  views: string = "";

  comments_content: string = "";

  nbr_people: number = 0;

  latitude: string = "";
  longitude: string = "";
  locality: string = "";
  county: string = "";
  region: string = "";
  country: string = "";
  neighbourhood: string = "";

  private d = new Date(0);

  constructor(private flickrService: FlickrService, private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.flickrService.getPhotoDetailsById(Number(this.id)).subscribe((data) => {
      this.url = `${environment.imageServerURL}${data.photo.server}/${data.photo.id}_${data.photo.secret}.jpg`;;
      this.title = data.photo.title._content;
      this.owner_username = data.photo.owner.username;
      this.owner_realname = data.photo.owner.realname;
      this.owner_location = data.photo.owner.location;
      this.description = data.photo.description._content;
      // TODO : work this shit out
      this.date_posted.setUTCSeconds(+data.photo.dates.posted);
      this.date_taken = data.photo.dates.taken;
      this.date_lastupdate.setUTCSeconds(+data.photo.dates.lastupdate);
      this.views = data.photo.views;
      this.comments_content = data.photo.comments._content;
      this.nbr_people = data.photo.people.haspeople;
      this.latitude = data.photo.location.latitude;
      this.longitude = data.photo.location.longitude;
      this.locality = data.photo.location.locality._content;
      this.county = data.photo.location.county._content;
      this.region = data.photo.location.country._content;
      this.neighbourhood = data.photo.location.neighbourhood._content;
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });

    // TODO : Manage comments, probably regroup everything in a map cause this is ugly as fuck,
    // check if every meta we want are here, other pictures from the owner
    // flickr.people.getPhotos or flickr.people.getPublicPhotos
    // flickr.photos.comments.getList
  }

}
