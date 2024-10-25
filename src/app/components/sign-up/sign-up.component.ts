import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator, strongPasswordValidator } from '../../shared/validators';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input-gg';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup
  showPassword: boolean = false
  showConfPassword: boolean = false
  SearchCountryField = SearchCountryField
  CountryISO = CountryISO
  preferredCountries: CountryISO[] = [CountryISO.India]

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), strongPasswordValidator]],
      confirm_password: ['', [Validators.required]]
    }, { validator: passwordMatchValidator() });
  }


  onSubmit(form: any) {
    form.markAllAsTouched()
    if (form.invalid) {
      return
    }

    let apiUrl = `user/singup`
    let formData = new URLSearchParams()
    formData.set('name', form.value.name)
    formData.set('email', form.value.email)
    formData.set('password', form.value.password)
    formData.set('confirm_password', form.value.confirm_password)
    formData.set('phone', form.value.phone)
    this.service.post(apiUrl, formData.toString()).subscribe(res => {
      if (res.success) {
        this.toastr.success(res.message)
        this.router.navigate(['/'])
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getErrorMessage(field: string) {
    const control = this.signUpForm.controls[field]
    if (control.hasError('required')) {
      return 'This field cannot be empty'
    } else if (control.hasError('email')) {
      return 'Please enter a valid email address'
    } else if (control.hasError('minlength')) {
      return `Password must be at least ${control.getError('minlength').requiredLength
        } characters long`
    } else if (control.hasError('validatePhoneNumber')) {
      const errors = control.getError('validatePhoneNumber')
      if (!errors.valid) return 'Please enter a valid phone number'
    } else if (control.hasError('strongPassword')) {
      const errors = control.getError('strongPassword')
      if (!errors.isValidLength)
        return 'Password must be at least 8 characters long'
      if (!errors.hasUpperCase)
        return 'Password must contain at least one uppercase letter'
      if (!errors.hasLowerCase)
        return 'Password must contain at least one lowercase letter'
      if (!errors.hasNumeric) return 'Password must contain at least one number'
      if (!errors.hasSpecialCharacter)
        return 'Password must contain at least one special character'
    }
    return ''
  }
}
