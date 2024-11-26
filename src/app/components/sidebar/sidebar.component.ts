import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  loading: boolean = false;
  data: any;
  tagdata: any[] = [];
  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories()
    this.getTags()
  }

  getCategories() {
    this.loading = true
    let apiUrl = `image/get-album`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  hasValidSubcategories(item: any): boolean {
    return item.findImageSubcategory && item.findImageSubcategory.some((sub: any) => sub.subcategory_name);
  }

  hasValidSubSubcategories(subcategory: any): boolean {
    return subcategory.subSubCategoryData && subcategory.subSubCategoryData.some((subSub: any) => subSub.subSubCategoryName);
  }

  getUniqueSubAlbums(subAlbums: any[]) {
    const uniqueAlbums = subAlbums.reduce((acc, current) => {
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


  getTags() {
    this.loading = true
    let apiUrl = `tag/get-all`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.tagdata = res.tagAll
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }
}
