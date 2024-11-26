import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/DialogService';
import { StudioAlbumComponent } from '../studio-album/studio-album.component';

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
  searchMode: string = 'OR';
  tagSearchMode: string = 'AND';
  searchOptions = {
    photo_title: false,
    file_name: false,
    author: false,
    comment: false,
    album_title: false,
    album_desc: false
  };
  searchWord: string = ''
  tagData: any;
  selectedPostDate: string = '';
  selectedFileType: string = '';
  searchAlbumQuery: string = ''
  isInSubAlbumSearch: boolean = false;
  isInsubSubAlbumSearch: boolean = false;
  addedby: any[] = []

  constructor(
    private service: SharedService,
    private router: Router,
    private dialogService: DialogService
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
        this.tagData = res.tagAll
        this.filteredOptions = [...this.tagData]
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  onValidate() {
    this.loading = true
    let apiUrl = `image/getfilter-images`

    const tags = this.selectedItems.reduce(
      (result: { tag_id: string; subtag_id: string }, item: any) => {
        result.tag_id += `${item.id},`;

        if (item.subtag_id && item.subtag_id.length) {
          result.subtag_id += `${item.subtag_id.join(',')},`;
        }

        return result;
      },
      { tag_id: "", subtag_id: "" }
    );
    tags.tag_id = tags.tag_id.replace(/,$/, '');
    tags.subtag_id = tags.subtag_id.replace(/,$/, '');

    const tagObj = {
      "tag_search": tags.tag_id,
      "subtag_search": tags.subtag_id,
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
      "album_sub": this.isInSubAlbumSearch,
    }

    let formData = new URLSearchParams()

    formData.set("post_date", this.selectedPostDate)
    formData.set("author", this.addedby ? this.addedby.join(', ') : '')
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
    console.log(this.filteredOptions);

  }

  filterOptions() {
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      this.filteredOptions = this.tagData.filter(
        (item: any) =>
          item.tag.toLowerCase().includes(search) ||
          item.subTagData?.some((sub: any) =>
            sub.sub_tagName.toLowerCase().includes(search)
          )
      );
    } else {
      this.filteredOptions = [...this.tagData];
    }
  }

  onTagChange(tag: any, event: any) {
    tag.selected = event.target.checked;
    if (tag.selected) {
      const existingTag = this.selectedItems.find((item) => item.id === tag.id);
      if (!existingTag) {
        this.selectedItems.push({ id: tag.id, tag: tag.tag, subTagName: null });
      }
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item.id !== tag.id);
      tag.subTagData?.forEach((subTag: any) => {
        subTag.selected = false;
      });
    }
  }

  onSubTagChange(tag: any, subTag: any, event: any) {
    subTag.selected = event.target.checked;
    // Find if the tag is already in selectedItems
    let existingTag = this.selectedItems.find(item => item.id === tag.id);

    if (subTag.selected) {
      // If the tag is not in selectedItems, add it
      if (!existingTag) {
        this.selectedItems.push({
          id: tag.id,
          tag: tag.tag,
          subtag_id: [subTag.subTagId],
          subTagName: [subTag.sub_tagName]
        });
      } else {
        // If the tag is already in selectedItems, add the subTag ID and name to the subtag arrays
        if (!existingTag.subtag_id?.includes(subTag.subTagId)) {
          existingTag.subtag_id.push(subTag.subTagId);
          existingTag.subTagName.push(subTag.sub_tagName);
        }
      }
    } else {
      // If the subTag is deselected, remove the subTag subTagId and name from the arrays
      if (existingTag) {
        const subTagIndex = existingTag.subtag_id.indexOf(subTag.subTagId);
        if (subTagIndex !== -1) {
          existingTag.subtag_id.splice(subTagIndex, 1);
          existingTag.subTagName.splice(subTagIndex, 1);
        }

        // If no subTags remain selected for this tag, remove the tag from selectedItems
        if (existingTag.subtag_id.length === 0) {
          this.selectedItems = this.selectedItems.filter(item => item.id !== tag.id);
        }
      }
    }
    tag.selected = tag.subTagData.some((sub: any) => sub.selected);
  }


  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter((selected) => selected !== item);
    const tag = this.tagData.find((t: any) => t.id === item.id);
    if (tag) {
      tag.selected = false;
      if (item.subTagName) {
        const subTag = tag.subTagData?.find((sub: any) => sub.sub_tagName === item.subTagName);
        if (subTag) {
          subTag.selected = false;
        }
      } else {
        tag.subTagData?.forEach((sub: any) => {
          sub.selected = false;
        });
      }
    }
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
    const index = this.addedby.indexOf(user_id);

    if (index === -1) {
      this.addedby.push(user_id);
    } else {
      this.addedby.splice(index, 1);
    }
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
        this.addedby = []
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

  openDialog(id: any): void {
    this.dialogService.open(StudioAlbumComponent, {
      paramId: id
    });
  }

}
