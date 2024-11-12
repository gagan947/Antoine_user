import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-recent-post',
  templateUrl: './news-recent-post.component.html',
  styleUrl: './news-recent-post.component.css'
})
export class NewsRecentPostComponent {
  subCategories: any;
  data: any;
  offset = 0;
  limit = 50;
  loading: boolean = false;
  selectedId: any = null;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.getImages()
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const threshold = 300;
    const position = window.pageYOffset + window.innerHeight;
    const height = document.documentElement.scrollHeight;

    if (position > height - threshold && !this.loading) {
      this.getImages();
    }
  }

  getImages() {
    this.loading = true;
    let apiUrl = `website-images/get-websiteimages?website_category_id=5&website_subcategory_id=${this.selectedId}&limit=${this.limit}&offset=${this.offset}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        if (this.offset === 0) {
          this.data = res.data.recentPosts;
        } else {
          this.data = [...this.data, ...res.data.recentPosts];
        }
        this.loading = false;
        this.offset += this.limit;
      } else {
        this.loading = false;
      }
    });
  }

  filterImage(id: any) {
    this.selectedId = id
    this.offset = 0
    this.getImages()
  }
}
