import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  getUser() {
    throw new Error('Method not implemented.');
  }

  currentUser$;

  constructor(private auth: Auth) {
    this.currentUser$ = authState(this.auth);
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(( {user}) => updateProfile(user, {displayName: name}) ),
    )
  }

  
}
