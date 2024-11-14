import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ContactUsForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    this.ContactUsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      language: ['', [Validators.required]],
    })
  }


  onSubmit(form: any) {
    form.markAllAsTouched()
    if (form.invalid) {
      return
    }

    let apiUrl = `contact/create`
    let formData = new URLSearchParams()
    formData.set('frist_name', form.value.firstName)
    formData.set('last_name', form.value.lastName)
    formData.set('email', form.value.email)
    formData.set('company', form.value.company)
    formData.set('language', form.value.language)
    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.toastr.success('Thank you for reaching out! We have received your message and will get back to you shortly')
        this.router.navigate(['/fine-art'])
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getErrorMessage(field: string) {
    const control = this.ContactUsForm.controls[field]
    if (control.hasError('required')) {
      return 'This field cannot be empty'
    } else if (control.hasError('email')) {
      return 'Please enter a valid email address'
    }
    return ''
  }
}
