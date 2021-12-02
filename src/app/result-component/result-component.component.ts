import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { PhotosInterface } from '../photos-interface';

@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})
export class ResultComponentComponent implements OnInit {

  photos : any;
  url : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  queryFlickr(){
    console.log("ok");
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("paramName", "landscape"); // tmp

    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    url += '3916944f55d2c8f5a6f3c7e2b0c37ccb&text=landscape&format=json&nojsoncallback=1';
    //this.http.get(url, { headers: headers, params: search});
    this.http.get<PhotosInterface>(url).subscribe(data => {
      this.photos = data.photos.photo;
      let photo = this.photos[0];
      console.log("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
      this.url = "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
      // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
    });
    
  }

}
