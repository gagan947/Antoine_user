import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-my-album',
  templateUrl: './add-my-album.component.html',
  styleUrl: './add-my-album.component.css'
})
export class AddMyAlbumComponent {
  form: FormGroup
  paramId: any
  data: any;
  tagData: any;
  uploadImg: any;
  ImgData: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [''],
      category: [''],
      tags: [''],
    })

    this.route.queryParams.subscribe((params) => {
      this.paramId = params['id']
    });
  }

  ngOnInit() {
    this.getCategories()
    this.getTags()
    if (this.paramId) {
      this.getById()
    }
  }

  ngFileInputChange(e: any) {
    this.uploadImg = e.target.files[0]
  }

  onSubmit(form: any) {
    form.markAllAsTouched()
    if (form.invalid) {
      return
    }

    const tags: any = this.selectedItems.map(item => item.id)

    const categories: any = this.selectedCatItems.map(item => ({
      "category_id": item.categoryId,
      "subcategory_id": item.subcategoryId
    }));

    let apiUrl = ''
    let formData = new FormData()
    if (this.paramId) {
      apiUrl = `image/updateimage-byid`
      formData.append('category', JSON.stringify(categories))
      formData.append('file', this.uploadImg)
      formData.append('id', this.paramId)
      formData.append('tag_id', tags)
      formData.append('collaburate_status', "0")
    } else {
      apiUrl = `image/create`
      formData.append('category', JSON.stringify(categories))
      formData.append('file', this.uploadImg)
      formData.append('tag_id', tags)
      formData.append('collaburate_status', "0")
    }

    this.service.upload(apiUrl, formData).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message)
        this.router.navigate(['/my-album'])
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getErrorMessage(field: string) {
    const control = this.form.controls[field]
    if (control.hasError('required')) {
      return 'This field cannot be empty'
    }
    return ''
  }

  getById() {
    let apiurl = `image/image-profile?id=${this.paramId}`
    this.service.get(apiurl).subscribe(res => {
      if (res.success) {
        const data = res.imageData.findImageProfile[0]
        data.sub_album.forEach((album: any) => {
          this.filteredCatOptions.forEach(category => {
            if (category.id === album.category_id) {
              category.subcategoryData.forEach((subcategory: any) => {
                if (subcategory.id === album.subcategory_id) {
                  subcategory.selected = true;
                  category.selected = true
                  const existingItem = this.selectedCatItems.find(item =>
                    item.categoryId === category.id && item.subcategoryId === subcategory.id
                  );

                  if (!existingItem) {
                    this.selectedCatItems.push({
                      categoryId: category.id,
                      subcategoryId: subcategory.id,
                      categoryName: category.category_name,
                      subcategoryName: subcategory.subcategory_name,
                      selected: true
                    });
                  }
                }
              });
            }
          });
        });

        this.selectedItems = [...data.tags]

      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getCategories() {
    let apiUrl = `image/get-categoryandsubcategory`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.data = res.data
        this.filteredCatOptions = [...this.data]
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getTags() {
    let apiUrl = `tag/get-all`
    this.service.get(apiUrl).subscribe(res => {
      if (res.success) {
        this.tagData = res.tagAll
        this.filteredOptions = [...this.tagData]
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Gagan'];
  selectedItems: any[] = [];
  filteredOptions: any[] = [];
  filteredCatOptions: any[] = [];
  searchTerm: string = '';
  searchCatTerm: string = '';
  dropdownOpen: boolean = false;
  dropdownOpenCat: boolean = false;
  selectedCatItems: any[] = [];

  toggleDropdown(open: boolean) {
    this.dropdownOpen = open;
  }

  toggleCatDropdown(open: boolean) {
    this.dropdownOpenCat = open;
  }
  closeAll() {
    this.dropdownOpenCat = this.dropdownOpen = false
  }

  filterOptions() {
    if (this.searchTerm) {
      this.filteredOptions = this.tagData.filter((item: { tag: string; }) =>
        item.tag.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredOptions = [...this.tagData];
    }
  }

  filterCatOptions() {
    if (this.searchCatTerm) {
      this.filteredCatOptions = this.data.filter((item: any) =>
        item.category_name.toLowerCase().includes(this.searchCatTerm.toLowerCase())
      );
    } else {
      this.filteredCatOptions = [...this.data];
    }
  }

  selectItem(option: string) {
    if (!this.selectedItems.includes(option)) {
      this.selectedItems.push(option);
    }
    this.searchTerm = '';
    this.filterOptions();
  }

  removeItem(option: string) {
    this.selectedItems = this.selectedItems.filter(item => item !== option);
  }


  onCategoryChange(category: any, event: any) {
    category.selected = event.target.checked;

    if (category.selected) {
      const existingCategory = this.selectedCatItems.find(item => item.categoryId === category.id && item.subcategoryId === null);

      if (!existingCategory) {
        this.selectedCatItems.push({
          categoryId: category.id,
          subcategoryId: null,
          categoryName: category.category_name,
          subcategoryName: null
        });
      }
    } else {
      this.selectedCatItems = this.selectedCatItems.filter(item => item.categoryId !== category.id);
      category.subcategoryData.forEach((sub: any) => {
        sub.selected = false;
        sub.disabled = false;
      });
    }
  }

  onSubcategoryChange(category: any, subcategory: any, event: any) {
    subcategory.selected = event.target.checked;
    category.selected = event.target.checked;

    if (subcategory.selected) {
      const existingCategoryIndex = this.selectedCatItems.findIndex(item => item.categoryId === category.id && item.subcategoryId === null);

      if (existingCategoryIndex !== -1) {
        this.selectedCatItems[existingCategoryIndex] = {
          categoryId: category.id,
          subcategoryId: subcategory.id,
          categoryName: category.category_name,
          subcategoryName: subcategory.subcategory_name
        };
      } else {
        this.selectedCatItems.push({
          categoryId: category.id,
          subcategoryId: subcategory.id,
          categoryName: category.category_name,
          subcategoryName: subcategory.subcategory_name
        });
      }

      category.subcategoryData.forEach((sub: any) => {
        if (sub !== subcategory) {
          sub.disabled = true;
        }
      });
    } else {
      this.selectedCatItems = this.selectedCatItems.filter(item => item.subcategoryId !== subcategory.id);

      const anySelected = category.subcategoryData.some((sub: any) => sub.selected);
      if (!anySelected) {
        category.subcategoryData.forEach((sub: any) => (sub.disabled = false));

        this.selectedCatItems.push({
          categoryId: category.id,
          subcategoryId: null,
          categoryName: category.category_name,
          subcategoryName: null
        });
      }
    }
  }
}
