import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent {
  loading: boolean = false;
  data: any;
  paramId: any;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.paramId = params['id']
    });
  }

  ngOnInit() {
    this.getSubCategories()
  }

  getSubCategories() {
    this.loading = true
    let apiUrl = `image/getsubcategory-albumbycatgeoryid?category_id=${this.paramId}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data
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
