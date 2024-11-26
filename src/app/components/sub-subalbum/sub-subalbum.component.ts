import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-subalbum',
  templateUrl: './sub-subalbum.component.html',
  styleUrl: './sub-subalbum.component.css'
})
export class SubSubalbumComponent {
  loading: boolean = false;
  data: any;
  cat_id: any;
  subcat_id: any
  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.cat_id = params['cat_id']
      this.subcat_id = params['subcat_id']
    });
  }

  ngOnInit() {
    this.getSubCategories()
  }

  getSubCategories() {
    this.loading = true
    let apiUrl = `image/fetchsubsubCategoryBycatgeoryidAndSubCategoryId?category_id=${this.cat_id}&subcategory_id=${this.subcat_id}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data.data
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  getUniqueSubAlbums(subAlbums: any[]) {
    const uniqueAlbums = subAlbums?.reduce((acc, current) => {
      const exists = acc.find(
        (item: any) =>
          item.category_id === current.category_id &&
          item.subcategory_id === current.subcategory_id
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueAlbums;
  }
}
