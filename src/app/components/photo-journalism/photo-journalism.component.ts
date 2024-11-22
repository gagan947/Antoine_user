import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../services/DialogService';
import { HomeFullViewDetailComponent } from '../home-full-view-detail/home-full-view-detail.component';

@Component({
  selector: 'app-photo-journalism',
  templateUrl: './photo-journalism.component.html',
  styleUrl: './photo-journalism.component.css'
})
export class PhotoJournalismComponent {
  subCategories: any;
  data: any;
  offset = 0;
  limit = 50;
  loading: boolean = false;
  selectedId: any = null;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
  }


  ngOnInit() {
    this.getSubCategories()
    this.getImages()
  }

  getSubCategories() {
    let apiUrl = `website-images/get-websitesubcategory`
    let formData = new URLSearchParams()
    formData.set('category_id', '2')
    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.subCategories = res.subcategory
      } else {
      }
    })
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
    let apiUrl = `website-images/get-websiteimages?website_category_id=2&website_subcategory_id=${this.selectedId}&limit=${this.limit}&offset=${this.offset}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        const fetchedData = res.data.findImage || [];

        if (this.offset === 0) {
          this.data = fetchedData;
        } else {
          this.data = this.data.concat(fetchedData);
        }

        if (fetchedData.length > 0) {
          this.offset += this.limit;
        }

      } else {
        if (this.offset === 0) {
          this.data = [];
        }
      }

      this.loading = false;
    });
  }

  filterImage(id: any) {
    this.selectedId = id
    this.offset = 0
    this.getImages()
  }

  openDialog(data: any, img_id: any): void {
    this.dialogService.open(HomeFullViewDetailComponent, {
      dialogData: {
        id: img_id,
        data: data
      }
    });
  }

}
