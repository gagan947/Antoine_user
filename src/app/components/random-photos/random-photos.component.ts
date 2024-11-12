import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random-photos',
  templateUrl: './random-photos.component.html',
  styleUrl: './random-photos.component.css'
})
export class RandomPhotosComponent {
  loading: boolean = false;
  data: any;
  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getrandomImg()
  }

  getrandomImg() {
    this.loading = true
    let apiUrl = `image/getrandom-images`
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
