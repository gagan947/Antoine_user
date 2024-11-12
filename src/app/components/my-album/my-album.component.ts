import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-my-album',
  templateUrl: './my-album.component.html',
  styleUrl: './my-album.component.css'
})
export class MyAlbumComponent {
  ImgData: any;

  constructor(
    private toastr: ToastrService,
    private service: SharedService,
  ) {
  }

  ngOnInit() {
    this.getAllimages()
  }

  getAllimages() {
    let apiUrl = `image/userget-allimages`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.ImgData = res.data
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  collabrate(img_id: any) {
    let apiUrl = `image/admin-updateusercollaburateimagestatus`

    let formData = new URLSearchParams()
    formData.set('image_id', img_id)
    formData.set('collaburate_status', '1')

    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message)
        this.getAllimages()
      } else {
        this.toastr.error(res.message)
      }
    })
  }

}


