import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {PhotoInterface} from "../shared/models/photo-interface";
import {FlickrService} from "../shared/services/flickr.service";
import {SafeSearch} from "../shared/enums/safe-search";
import {Sort} from "../shared/enums/sort";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search: string;
  photos: PhotoInterface[];
  isFiltersDisplayed: boolean;
  isSearch: boolean;
  safeSearchFilter: SafeSearch;
  safeSearchEnum = SafeSearch;
  sortFilter: Sort;
  sortEnum = Sort;
  page = 0;
  pages = 0;

  constructor(private flickrService: FlickrService) {
    this.search = '';
    this.photos = [];
    this.isFiltersDisplayed = false;
    this.isSearch = false;
    this.safeSearchFilter = SafeSearch.SAFE;
    this.sortFilter = Sort.DATE_POSTED_DESC;
  }

  public ngOnInit() {
    document.getElementById("text-input")!.addEventListener('keydown', e => this.detectEnter(e));
    this.flickrService.getInterestingPhotos().subscribe((photos) => {
      this.photos = photos;
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
  }

  public detectEnter(event : any){
    if(event.key == "Enter"){
      this.submitSearch();
    }
  }

  public submitSearch() {
    this.isSearch = true;
    this.searchPhotos();
  }

  public getImageURLFromPhoto(photo: PhotoInterface) {
    return this.flickrService.getImageURLFromPhoto(photo);
  }

  public toggleFilters(): void {
    this.isFiltersDisplayed = !this.isFiltersDisplayed;
  }

  public searchPhotos(page  =1): void {
    this.flickrService.searchPhotosByTextAndFilters(this.search, this.safeSearchFilter, this.sortFilter, page).subscribe((data) => {
      this.photos = data.photos.photo;
      this.page = data.photos.page;
      this.pages = data.photos.pages
    }, (err: HttpErrorResponse) => {
      console.log("An error has occurred");
      console.log(err);
    });
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page++;
      this.searchPhotos(this.page);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.searchPhotos(this.page);
    }
  }
}
