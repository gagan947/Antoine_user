import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'antoine-user';

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.loadExternalScript();
      }
    });
  }

  loadExternalScript() {
    const scriptUrls = [
      'assets/js/swiper_slider.js',
      'assets/js/filter_gallery.js',
      'assets/js/main.js'
    ];

    scriptUrls.forEach((url) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.onload = () => {
        console.log(`External script ${url} loaded`);
      };
      document.body.appendChild(scriptElement);
    });
  }
}
