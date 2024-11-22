import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-full-view-detail',
  templateUrl: './home-full-view-detail.component.html',
  styleUrl: './home-full-view-detail.component.css'
})
export class HomeFullViewDetailComponent {
  @ViewChild('fullScreenContainer') fullScreenContainer!: ElementRef;
  @Output() closed = new EventEmitter<void>();
  @Input() dialogData: any

  paramId: any
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
    console.log(this.dialogData);

    this.getAlbum()
  }

  getAlbum() {
    this.data = this.dialogData.data.find((item: any) => {
      return item.id === this.dialogData.id;
    });
    console.log(this.data);

  }

  nextImage(id: any) {
    const currentIndex = this.dialogData.data.findIndex((item: { id: any; }) => item.id === id);

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % this.dialogData.data.length;
      this.data = this.dialogData.data[nextIndex];
    }
  }

  prevImage(id: any) {
    const currentIndex = this.dialogData.data.findIndex((item: { id: any; }) => item.id === id);

    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + this.dialogData.data.length) % this.dialogData.data.length;
      this.data = this.dialogData.data[prevIndex];
    }
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
}
