import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {FlickrService} from "../shared/services/flickr.service";
// TODO change this shit
import {environment} from "../../environments/environment";
import { PhotoInterface } from '../shared/models/photo-interface';
import { waitForAsync } from '@angular/core/testing';
import { Comment } from '../shared/models/comment';

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
  owner_nsid: string = "";

  description: string = "";
  date_posted = new Date(0);
  date_taken: string = "";
  date_lastupdate = new Date(0);

  views: string = "";

  comments_content: string = "";

  latitude: string = "";
  longitude: string = "";
  locality: string = "";
  county: string = "";
  region: string = "";
  country: string = "";
  neighbourhood: string = "";

  other_photos: PhotoInterface[] = [];
  other_photos_page = 1;

  photoPage = 1;
  pages = 1;

  commentsManager: CommentsManager = new CommentsManager

  constructor(public flickrService: FlickrService, private route: ActivatedRoute) {
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
      this.owner_nsid = data.photo.owner.nsid;
      this.description = data.photo.description._content;
      // TODO : work this shit out
      this.date_posted.setUTCSeconds(+data.photo.dates.posted);
      this.date_taken = data.photo.dates.taken;
      this.date_lastupdate.setUTCSeconds(+data.photo.dates.lastupdate);
      this.views = data.photo.views;
      this.comments_content = data.photo.comments._content;
      this.latitude = data.photo.location.latitude;
      this.longitude = data.photo.location.longitude;
      this.locality = data.photo.location.locality._content;
      this.county = data.photo.location.county._content;
      this.region = data.photo.location.region._content;
      this.country = data.photo.location.country._content;
      this.neighbourhood = data.photo.location.neighbourhood._content;

      // Not sure about that one ?
      this.getOtherPhotos(this.photoPage);
      this.getComments();
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
    // TODO : Manage comments, probably regroup everything in a map cause this is ugly as fuck,
    // check if every meta we want are here, other pictures from the owner
    // flickr.people.getPhotos or flickr.people.getPublicPhotos
    // flickr.photos.comments.getList
  }

  getOtherPhotos(photoPage: number) {
      this.flickrService.getOtherPhotosFromUser(this.owner_nsid, photoPage).subscribe((data) => {
        this.other_photos = data.photos.photo;
        this.pages = data.photos.pages;
      }, (err: HttpErrorResponse) => {
        console.log("An error has occurred");
        console.log(err);
      })
  }

  getComments() {
    this.flickrService.getPhotoComments(this.id).subscribe((data) => {
      this.commentsManager.comments = data.comments.comment;
      this.commentsManager.toDisplay = data.comments.comment.slice(0, this.commentsManager.commentPageSize);
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
      console.log(err);
    })
  }

  nextPhotoPage() {
    if (this.photoPage < this.pages) {
      this.photoPage++;
      this.getOtherPhotos(this.photoPage);
    }
  }

  previousPhotoPage() {
    if (this.photoPage > 1) {
      this.photoPage--;
      this.getOtherPhotos(this.photoPage);
    }
  }
}

class CommentsManager {
  comments: Comment[] = [];
  toDisplay: Comment[] = [];
  commentPage = 0;
  commentPageSize = 5;

  nextCommentPage() {
    if (this.commentPage < Math.floor(this.comments.length / this.commentPageSize)) {
      this.commentPage++;
      var newStart = this.commentPage * this.commentPageSize
      this.toDisplay = this.comments.slice(newStart, newStart + this.commentPageSize)
    }
  }

  previousCommentPage() {
    if (this.commentPage > 0) {
      this.commentPage--;
      var newStart = this.commentPage * this.commentPageSize
      this.toDisplay = this.comments.slice(newStart, newStart + this.commentPageSize)
    }
  }
}