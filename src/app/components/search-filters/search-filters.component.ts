import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {
  loading: boolean = false;
  data: any;
  imgData: any;
  searchQuery: string = '';
  searchMode: string = '';
  tagSearchMode: string = '';
  searchOptions = {
    photo_title: false,
    file_name: false,
    author: false,
    comment: false,
    album_title: false,
    album_desc: false
  };
  searchWord: string = ''
  tags: any;
  selectedPostDate: string = '';
  selectedFileType: string = '';
  searchAlbumQuery: string = ''
  isInSubAlbumSearch: boolean = false;
  addedby: any

  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getImageCount()
    this.getTags()
    this.service.currentSearchQuery.subscribe(query => {
      this.searchQuery = query;
      if (this.searchQuery) {
        this.loadDataBasedOnSearch(this.searchQuery);
      } else {
        this.onValidate()
      }
    });
  }

  loadDataBasedOnSearch(query: string) {
    this.loading = true
    let apiUrl = `image/get-search?search=${query}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.imgData = res.data
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  getImageCount() {
    this.loading = true
    let apiUrl = `image/getfilter-imagescount`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.filterCount
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  getTags() {
    this.loading = true
    let apiUrl = `tag/get-all`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.tags = res.tagAll
        this.filteredOptions = [...this.tags]
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  onValidate() {
    this.loading = true
    let apiUrl = `image/getfilter-images`

    const tagObj = {
      "tag_search": this.selectedItems.join(',').toString(),
      "all_tag": this.tagSearchMode === 'AND' ? true : false,
      "any_tag": this.tagSearchMode === 'OR' ? true : false,
    }

    const searchWordObj = {
      "photo_title": this.searchOptions.photo_title,
      "file_name": this.searchOptions.file_name,
      "author": this.searchOptions.author,
      "search": this.searchWord
    }

    const albumObj = {
      "album_search": this.searchAlbumQuery,
      "album_sub": this.isInSubAlbumSearch
    }

    let formData = new URLSearchParams()

    formData.set("post_date", this.selectedPostDate)
    formData.set("author", this.addedby ? this.addedby : '')
    formData.set("file_type", this.selectedFileType)
    formData.set("album", JSON.stringify(albumObj))
    formData.set("tag", JSON.stringify(tagObj))
    formData.set("search_words", JSON.stringify(searchWordObj))

    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.imgData = res.data
        this.loading = false
        this.close()
      } else {
        this.loading = false
        this.close()
      }
    })
  }

  onSearchModeChange() {
    if (this.searchMode === 'AND') {
      this.toggleCheckboxes(true);
    } else if (this.searchMode === 'OR') {
      this.toggleCheckboxes(false);
    }
  }

  toggleCheckboxes(state: boolean) {
    this.searchOptions.photo_title = state;
    this.searchOptions.file_name = state;
    this.searchOptions.author = state;
    this.searchOptions.comment = state;
    this.searchOptions.album_title = state;
    this.searchOptions.album_desc = state;
  }

  selectedItems: any[] = [];
  dropdownOpen = false;
  searchTerm = '';
  filteredOptions: any[] = []

  toggleDropdown(open: boolean): void {
    this.dropdownOpen = open;
  }

  selectItem(option: { tag: string }) {
    this.selectedItems.push(option)
    this.searchTerm = '';
  }

  removeItem(item: any): void {
    this.selectedItems = this.selectedItems.filter(selected => selected !== item);
  }

  closeDropdown(event: Event): void {
    const clickedOutside = !(event.target as HTMLElement).closest('.multi-select-container');
    if (clickedOutside) {
      this.dropdownOpen = false;
    }
  }

  onPostDateChange(event: Event, postDate: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedPostDate = postDate;
    } else {
      this.selectedPostDate = '';
    }
  }

  onFileTypeChange(event: Event, type: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedFileType = type;
    } else {
      this.selectedFileType = '';
    }
  }

  onAddedByChnage(user_id: any) {
    this.addedby = user_id
  }

  clearFilter(type: string) {
    switch (type) {
      case 'searchWord':
        this.searchOptions.photo_title = false;
        this.searchOptions.file_name = false;
        this.searchOptions.author = false;
        this.searchOptions.comment = false;
        this.searchOptions.album_title = false;
        this.searchOptions.album_desc = false;
        this.searchWord = ''
        this.onValidate()
        return

      case 'tag':
        this.selectedItems = []
        this.tagSearchMode = ''
        this.onValidate()
        return

      case 'postDate':
        this.selectedPostDate = ''
        this.onValidate()
        return

      case 'fileType':
        this.selectedFileType = ''
        this.onValidate()
        return

      case 'album':
        this.searchAlbumQuery = ''
        this.isInSubAlbumSearch = false
        this.onValidate()
        return

      case 'addedBy':
        this.addedby = undefined
        this.onValidate()
        return

      default:
        return 'Unknown'
    }
  }

  closeAll() {
    this.dropdownOpen = false
  }

  close() {
    const dropdowns = document.querySelectorAll('.position-relative.ct_drop_show');
    dropdowns.forEach((dropdown: Element) => {
      (dropdown as HTMLElement).classList.remove('ct_drop_show');
    });
  }

}
