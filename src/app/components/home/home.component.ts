import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';

interface Comment {
  user: string;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user$: any;
  userEmail: string = '';
  comments: Comment[] = [];
  
  searchControl = new FormControl();
  commentControl = new FormControl();

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.user$.subscribe((user: any) => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  addComment() {
    if (this.commentControl.value && this.userEmail) {
      const newComment: Comment = {
        user: this.userEmail,
        text: this.commentControl.value,
        timestamp: new Date()
      };
      
      this.comments.push(newComment);
      this.commentControl.reset();
    }
  }
}
