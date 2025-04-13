import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
    return null;
  }
}

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {

submit() {
 if (!this.signUpForm.valid) {
   return;
 }
  const { name, email, password } = this.signUpForm.value;
  if (!name || !email || !password) {
    return;
  }
  this.authService.signUp(name, email, password).pipe(
    this.toast.observe({
      success: 'Sign up successful',
      loading: 'Signing up...',
      error: 'error has occurred'
    })
  ).subscribe(() => {
    this.router.navigate(['/home']);
  })
}

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),

}, { validators: passwordMatchValidator() });

constructor(private authService: AuthService, private toast: HotToastService, private router: Router) { }

get name() {
  return this.signUpForm.get('name');
}

get email() {
  return this.signUpForm.get('email');
} 

get password() {
  return this.signUpForm.get('password');
}

get confirmPassword() { 
  return this.signUpForm.get('confirmPassword');
} 
}
