import { Component, inject } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private authService = inject(AuthService);
  currentUser$ = new BehaviorSubject<User | null>(null);
  user: User | null = null;

  ngOnInit(): void {
    console.log('Admin component initialized');
    console.log('User is authenticated.', this.authService.getCurrentUser());

    if (!this.authService.isAuthenticated()) {
      console.warn('User is not authenticated. Redirecting to login page.');
      return;
    } else {
      console.log('User is authenticated.', this.authService.getCurrentUser());
      //this.user = this.authService.getCurrentUser();
    }



/* 
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user ?? null;
      this.currentUser$.next(this.user);
    }); */
  }

}
