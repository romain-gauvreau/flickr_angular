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
  keywords: string = "";
  searchPhotoUrl : string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  /**
   * This function checks whether the given string contains whitespaces
   * @param str the string to check
   * @returns true or false
   */
  isBlank(str : string) {
    return (!str || /^\s*$/.test(str));
  }

  queryFlickr(){

    if(!this.isBlank(this.keywords)){
      let searchUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='
      searchUrl += '3916944f55d2c8f5a6f3c7e2b0c37ccb&text='
      searchUrl += this.keywords + '&format=json&nojsoncallback=1';
  
      // console.log(searchUrl);

      this.http.get<PhotosInterface>(searchUrl).subscribe(data => {
        this.photos = data.photos.photo;
        let photo = this.photos[0];
        // console.log("https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
        this.searchPhotoUrl = "https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
      }, (err: HttpErrorResponse) => {
        console.log("An error has occured");
      }); 
    }
    else{
      console.log("No keywords were given");
    }
    
  }

}
