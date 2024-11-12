import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent {
  paramId: any
  data: any;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.paramId = params['news_id']
    });
  }

  ngOnInit() {
    if (this.paramId) {
      this.getById()
    }
  }
  getById() {
    this.loading = true
    let apiUrl = `website-images/websiteimage-byid?website_image_id=${this.paramId}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data.findImage[0]
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }
}
