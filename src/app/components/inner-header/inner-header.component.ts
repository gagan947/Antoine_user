import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrl: './inner-header.component.css'
})
export class InnerHeaderComponent {
  searchQuery: string = '';
  userData: any;

  constructor(private router: Router, private service: SharedService) {
    const userData: any = localStorage.getItem('userData')
    this.userData = JSON.parse(userData)

  }

  onSearch() {
    this.service.updateSearchQuery(this.searchQuery);
    this.router.navigate(['/search-filters'])
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/log-in'])
  }
}
