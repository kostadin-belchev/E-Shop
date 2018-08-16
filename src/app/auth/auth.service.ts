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

  signUp(email: string, password: string, username: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.toastrService.success('Registered successfully.', 'Success!')
      this.router.navigate(['/auth/signin'])
      let user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: username,
        photoURL: "https://www.bing.com/images/search?view=detailV2&ccid=GX%2b5VV6G&id=966A8A86B3CE355297371BE4881C9C6445ADF21C&thid=OIP.GX-5VV6GChstVIyY8zzs7gHaJi&mediaurl=https%3a%2f%2fcamo.githubusercontent.com%2f341831200626efe3e0cf83317801fcac2200fbe2%2f68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323639323831302f323130343036312f34643839316563302d386637362d313165332d393230322d6637333934306431306632302e706e67&exph=358&expw=278&q=default+avatar+image&simid=608022090080914380&selectedIndex=15"
      }).then(function() {
        console.log('Username and photo of user created.')
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    }).catch(err => this.toastrService.error(err.message, 'Warning!'))
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token)
      this.toastrService.success('Logged in successfully.', 'Success')
      this.router.navigate(['/products'])
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

  getUsername() {
    let username = firebase.auth().currentUser.displayName
    // console.log(firebase.auth().currentUser)
    return username
  }

  isAuthenticated() {
    return this.token != null
  }
}