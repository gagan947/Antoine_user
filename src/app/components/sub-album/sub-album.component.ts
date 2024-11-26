import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../services/DialogService';
import { StudioAlbumComponent } from '../studio-album/studio-album.component';

@Component({
  selector: 'app-sub-album',
  templateUrl: './sub-album.component.html',
  styleUrl: './sub-album.component.css'
})
export class SubAlbumComponent {
  loading: boolean = false;
  data: any;
  subcat_id: any;
  cat_id: any;
  category: any;
  subCategory: any;
  tag_id: any;
  tag: any;
  subsubcategory_id: any;
  subSubCategory: any;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.subcat_id = params['subcat_id'] ? params['subcat_id'] : undefined
      this.cat_id = params['cat_id'] ? params['cat_id'] : undefined
      this.subsubcategory_id = params['subsubcat_id'] ? params['subsubcat_id'] : undefined
      this.tag_id = params['tag_id'] ? params['tag_id'] : undefined
      this.getAlbum()
    });
  }

  ngOnInit() {
    // this.getAlbum()
  }

  getAlbum() {
    this.loading = true
    let apiUrl = ``
    if (this.tag_id) {
      apiUrl = `image/getallimages-bytagid?tag_id=${this.tag_id}`
    } else {
      apiUrl = `image/getsubsubCategory-albumbycatgeoryidAndSubCategoryId?category_id=${this.cat_id}&subcategory_id=${this.subcat_id}&subSubCatgeoryId=${this.subsubcategory_id}`
    }

    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data.findImage ? res.data.findImage : res.data.findAllImage
        this.category = res.data.category
        this.subCategory = res.data.subcategory
        this.subSubCategory = res.data.subSubCategory
        this.tag = res.data.tag
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  openDialog(id: any): void {
    this.dialogService.open(StudioAlbumComponent, {
      paramId: id
    });
  }
}
