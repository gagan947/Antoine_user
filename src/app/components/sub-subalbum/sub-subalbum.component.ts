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
}
