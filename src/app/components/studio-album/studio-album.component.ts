import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-studio-album',
  templateUrl: './studio-album.component.html',
  styleUrl: './studio-album.component.css',
})

export class StudioAlbumComponent {
  @ViewChild('fullScreenContainer') fullScreenContainer!: ElementRef;
  @Output() closed = new EventEmitter<void>();
  @Input() paramId: any

  loading: boolean = false;
  data: any;
  cat_id: any;
  category: any;
  subCategory: any;
  isFullScreen: boolean = false;
  userData: any;
  permissionObject: any;

  constructor(
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    // this.route.queryParams.subscribe((params) => {
    //   this.paramId = params['id']
    // });
    const userDataString: any = localStorage.getItem('userData');

    if (userDataString) {
      try {
        this.userData = JSON.parse(userDataString);
        if (this.userData.permission) {
          const parsedPermissions = JSON.parse(this.userData.permission);
          this.permissionObject = parsedPermissions.reduce((acc: any, curr: any) => {
            return { ...acc, ...curr };
          }, {});
        }
      } catch (error) {
        console.error('Error parsing userData or permission', error);
      }
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.closeDialog()
      }
    });
    this.getAlbum()
  }

  getAlbum() {
    this.loading = true
    let apiUrl = `image/image-profile?id=${this.paramId}`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.imageData.findImageProfile
        this.category = res.imageData.category
        this.subCategory = res.imageData.subcategory
      }
      this.loading = false
    })
  }

  nextImage(id: any) {
    // if (this.paramId < this.images.length - 1) {
    this.paramId = id
    this.getAlbum();
    // }
  }

  prevImage(id: any) {
    this.paramId = id;
    this.getAlbum();
  }

  copySuccess: boolean = false;
  copyData() {
    const dataToCopy = `
      ${this.data.image}
     `.trim();

    navigator.clipboard.writeText(dataToCopy).then(() => {
      this.copySuccess = true;
      setTimeout(() => this.copySuccess = false, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }


  enterFullscreen() {
    const container = this.fullScreenContainer.nativeElement;
    if (container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      this.isFullScreen = true
    }
  }

  exitFullscreen() {
    if (document.fullscreenElement) {
      this.isFullScreen = false
      document.exitFullscreen();
    }
  }

  zoomLevel: number = 1;

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 1)
  }

  isPlaying: boolean = false;
  autoPlayInterval: any
  autoPlay() {
    if (this.isPlaying) {
      this.isPlaying = false;
      clearInterval(this.autoPlayInterval);
    } else {
      this.isPlaying = true;
      this.autoPlayInterval = setInterval(() => {
        if (this.data.next_id !== '') {
          this.paramId = this.data.next_id;
          this.getAlbum();
        } else {
          this.isPlaying = false;
          clearInterval(this.autoPlayInterval);
        }
      }, 3000);
    }
  }

  downloadImage(imageUrl: string, imageName: string, img_id: any) {
    this.httpClient.get(imageUrl, { responseType: 'blob' }).subscribe((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = imageName;
      anchor.click();
      window.URL.revokeObjectURL(blobUrl);

      let apiUrl = 'image-log/create'
      let formData = new URLSearchParams()

      formData.set('image_id', img_id)
      formData.set('user_id', this.userData.id)
      this.service.post(apiUrl, formData.toString()).subscribe(res => {
      })
    }, error => {
      console.error('Image download failed:', error);
    });
  }

  ngOnDestroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  translateX = 0;
  translateY = 0;

  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private currentX = 0;
  private currentY = 0;

  startDragging(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    this.startX = clientX - this.currentX;
    this.startY = clientY - this.currentY;

    event.preventDefault();
  }

  dragImage(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    this.currentX = clientX - this.startX;
    this.currentY = clientY - this.startY;

    this.translateX = this.currentX;
    this.translateY = this.currentY;

    event.preventDefault();
  }

  stopDragging(): void {
    this.isDragging = false;
  }

  closeDialog(): void {
    this.closed.emit();
  }

  getUniqueSubAlbums(subAlbums: any[]) {
    const uniqueAlbums = subAlbums.reduce((acc, current) => {
      const exists = acc.find(
        (item: any) =>
          item.category_id === current.category_id &&
          item.subcategory_id === current.subcategory_id &&
          item.sub_sub_categoryName === current.sub_sub_categoryName
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueAlbums;
  }
}
