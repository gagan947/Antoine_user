import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrl: './inner-header.component.css'
})
export class InnerHeaderComponent {

  constructor(private router: Router) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/log-in'])
  }
}
