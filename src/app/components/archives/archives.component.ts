import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrl: './archives.component.css'
})
export class ArchivesComponent {
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
}
