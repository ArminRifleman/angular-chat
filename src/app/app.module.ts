import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMenuModule

  ],
  providers: [
    provideFirebaseApp(() => initializeApp({ projectId: "chat-d6a13", appId: "1:34558834066:web:d6cde843fe5baef0367d4b", storageBucket: "chat-d6a13.firebasestorage.app", apiKey: "AIzaSyAq1b-yVf6UnBqb8z4P4ysRy2vJ_s5EoNw", authDomain: "chat-d6a13.firebaseapp.com", messagingSenderId: "34558834066", measurementId: "G-R70PMH1NZQ" })),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
