import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosInterface } from '../photos-interface';
import { ResultComponentComponent } from '../result-component/result-component.component';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  @ViewChild(ResultComponentComponent) resultComponent : any;
  
  photos : any;
  keywords: string = "";

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

  querySearchFlickr(){
    if(!this.isBlank(this.keywords)){
      let searchUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='
      searchUrl += '3916944f55d2c8f5a6f3c7e2b0c37ccb&text='
      searchUrl += this.keywords + '&format=json&nojsoncallback=1';
  
      // console.log(searchUrl);

      this.http.get<PhotosInterface>(searchUrl).subscribe(data => {
        this.photos = data.photos.photo;
        console.log("ok");
        this.resultComponent.displayResultImages(this.photos);
        //let photo = this.photos[0];
        // TODO : envoyer le tab de photos au composant result
      }, (err: HttpErrorResponse) => {
        console.log("An error has occured");
      }); 
    }
    else{
      console.log("No keywords were given");
    }
  }
}
