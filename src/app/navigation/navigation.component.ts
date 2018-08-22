import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  // username: string

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.signOut()
  }

  getUsername() {
    // this.username = this.authService.getUsername()
    return this.authService.getUsername()
  }

  getIdOfCurrLoggedUser() {
    return this.authService.getCurrLoggedUserId()
  }

}
