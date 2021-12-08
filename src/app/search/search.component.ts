import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotosInterface } from '../photos-interface';
import { ResultComponent } from '../result/result.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(ResultComponent) resultComponent : any;

  photos : any;
  keywords: string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    document.getElementById("filtreBtn")?.addEventListener("click", this.displayFilters);
    this.keywords = this.route.snapshot.paramMap.get('query') ?? '';
    if(this.keywords){
      this.populateImages();
    } else {
      this.suggestionImages();
    }
  }

  /**
   * This function checks whether the given string contains whitespaces
   * @param str the string to check
   * @returns true or false
   */
  isBlank(str : string) {
    return (!str || /^\s*$/.test(str));
  }

  displayFilters(){
    console.log("clic");
    if(document.getElementById("filtres")?.style.getPropertyValue("display") == "inline-block"){
      document.getElementById("filtres")!.style.display = "none";
    }
    else{
      document.getElementById("filtres")!.style.display = "inline-block";
    }
  }

  querySearchFlickr(){
    if(!this.isBlank(this.keywords)){
      this.router.navigate(['search', this.keywords], { relativeTo: this.route });
    }
    else{
      console.log("No keywords were given");
    }
  }

  populateImages(){
    let searchUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    searchUrl += '3916944f55d2c8f5a6f3c7e2b0c37ccb&text='
    searchUrl += this.keywords + '&format=json&nojsoncallback=1';

    // console.log(searchUrl);

    this.http.get<PhotosInterface>(searchUrl).subscribe(data => {
      this.photos = data.photos.photo;
      this.resultComponent.displayResultImages(this.photos, 50); // appel de fonction du composant enfant
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
      console.log(err);
    });
  }

  suggestionImages(){
    let url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key="
    url = url + "3916944f55d2c8f5a6f3c7e2b0c37ccb" + "&format=json&nojsoncallback=1";
    this.http.get<PhotosInterface>(url).subscribe(data => {
      this.resultComponent.displayResultImages(data.photos.photo, 10);
    }, (err: HttpErrorResponse) => {
      console.log("An error has occured");
      console.log(err);
    });
  }
}
