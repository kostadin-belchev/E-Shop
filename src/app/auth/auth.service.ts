import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string

  constructor(
    private toastrService: ToastrService,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.toastrService.success('Registered successfully.', 'Success!')
      this.router.navigate(['/auth/signin'])
    }).catch(err => this.toastrService.error(err.message, 'Warning!'))
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token)
      this.toastrService.success('Logged in successfully.', 'Success')
      this.router.navigate(['/recipes'])
    }).catch(err => this.toastrService.error(err.message, 'Warning'))
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.toastrService.success('Logged out successfully.', 'Success')
      this.router.navigate(['/auth/signin'])
      this.token = null
    }).catch(err => this.toastrService.error(err.message, 'Warning'))
  }

  getToken() { // refresh the token
    firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token)
    return this.token
  }

  isAuthenticated() {
    return this.token != null
  }
}