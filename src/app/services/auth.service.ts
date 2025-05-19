import { Injectable, NgZone } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap, throwError } from 'rxjs';
import { retryWhen, delay, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$;

  constructor(private auth: Auth, private ngZone: NgZone) {
    this.currentUser$ = authState(this.auth);
  }

  login(email: string, password: string) {
    if (!navigator.onLine) {
      return throwError(() => new Error('No internet connection'));
    }

    return from(
      new Promise((resolve, reject) => {
        this.ngZone.run(() => {
          signInWithEmailAndPassword(this.auth, email, password)
            .then(resolve)
            .catch(reject);
        });
      })
    ).pipe(
      retryWhen(errors =>
        errors.pipe(delay(3000), take(3), catchError(err => throwError(() => err)))
      )
    );
  }

  logout() {
    return from(this.auth.signOut());
  }

  signUp(name: string, email: string, password: string) {
    return from(
      new Promise((resolve, reject) => {
        this.ngZone.run(() => {
          createUserWithEmailAndPassword(this.auth, email, password)
            .then(({ user }) =>
              updateProfile(user, { displayName: name }).then(() => resolve(user))
            )
            .catch(reject);
        });
      })
    );
  }

  getUser() {
    throw new Error('Method not implemented.');
  }
}
