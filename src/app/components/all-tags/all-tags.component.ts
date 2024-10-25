import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.css'
})
export class AllTagsComponent {
  loading: boolean = false;
  data: any;
  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTags()
  }

  getTags() {
    this.loading = true
    let apiUrl = `tag/get-all`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.tagAll
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }
}
