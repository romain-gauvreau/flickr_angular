import { Component, OnInit } from '@angular/core';
import {DetailsInterface} from "../details-interface";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id : String = "";
  title : String = "Chargement en cours...";
  url : String = "";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.getDetails();
  }

  getDetails(){
    let url = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="
    url += "3916944f55d2c8f5a6f3c7e2b0c37ccb" + "&format=json&nojsoncallback=1&photo_id=";
    url += this.id;
    this.http.get<DetailsInterface>(url).subscribe(data => {
      console.log(data)
      const photo = data.photo;
      this.title = photo.title._content;
      this.url = "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
      console.log(err);
    });
  }

}
