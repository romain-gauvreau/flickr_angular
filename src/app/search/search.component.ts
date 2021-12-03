import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosInterface } from '../photos-interface';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(ResultComponent) resultComponent : any;
  
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
        this.resultComponent.displayResultImages(this.photos); // appel de fonction du composant enfant
      }, (err: HttpErrorResponse) => {
        console.log("An error has occured");
      }); 
    }
    else{
      console.log("No keywords were given");
    }
  }
}
