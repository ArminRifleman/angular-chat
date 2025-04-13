import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  )

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
   ) { }

   get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  submit() {
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(email, password).pipe(

      this.toast.observe({
        success: ' ',
        loading: 'Logging in...',
        error: 'error has occurred'
      })

    ).subscribe(() => {
        this.router.navigate(['/home']);
    });
  
}

  }

  