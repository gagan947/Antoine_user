import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-album',
  templateUrl: './sub-album.component.html',
  styleUrl: './sub-album.component.css'
})
export class SubAlbumComponent {
  loading: boolean = false;
  data: any;
  paramId: any;
  cat_id: any;
  category: any;
  subCategory: any;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.paramId = params['id']
      this.cat_id = params['cat_id']
    });
  }

  ngOnInit() {
    this.getAlbum()
  }

  getAlbum() {
    this.loading = true
    let apiUrl = `image/getallimages-categorysubcategoryid?category_id=${this.cat_id}&subcategory_id=${this.paramId}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data.findImage
        this.category = res.data.category
        this.subCategory = res.data.subcategory
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }
}
