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
  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories()
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
}
