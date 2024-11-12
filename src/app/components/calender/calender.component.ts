import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent {
  loading: boolean = false;
  data: any;
  constructor(
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getYearMonth()
  }

  getYearMonth() {
    this.loading = true
    let apiUrl = `image/getimagescount-yearandmonth`
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
