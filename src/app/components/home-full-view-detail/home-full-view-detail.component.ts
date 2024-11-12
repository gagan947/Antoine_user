import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-full-view-detail',
  templateUrl: './home-full-view-detail.component.html',
  styleUrl: './home-full-view-detail.component.css'
})
export class HomeFullViewDetailComponent {
  data: any[] = [];
  loading: boolean = false;

  constructor(
    private service: SharedService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getImages()
  }

  getImages(): void {
    this.loading = true;
    const apiUrl = `website-images/get-websiteimages?website_category_id=null&website_subcategory_id=null&limit=${null}&offset=${null}`;

    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data.findImage;
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }
}
