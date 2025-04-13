import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  user$: any;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {
  }
}
