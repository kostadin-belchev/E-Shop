import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCreateModel } from './models/user-create.model';
import * as firebase from 'firebase'
import { database } from 'firebase/database'
import { map } from 'rxjs/operators';
import { ProductInCartModel } from './models/product-in-cart.model';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '../../../node_modules/@angular/router';

const baseUrl = 'https://ng-e-shop.firebaseio.com/users/'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  // createUser(body: UserCreateModel, id: string) {
  //   return this.httpClient.post(`${baseUrl}/${id}.json`, body)
  // }

  createUser = (user, uid) => {
    let obj = {}
    obj[uid] = user
    firebase.database().ref("users").update(obj).then(() => {
      // added correctly
      console.log('User Added correctly!')
    }).catch((err) => console.log(err))
  }

  addProductToUserCartById = (productId: string, body: ProductInCartModel) => {
    let userId = firebase.auth().currentUser.uid
    let obj = {}
    obj[productId] = body
    firebase.database().ref("users/" + userId + '/cart').update(obj).then(() => {
      this.toastrService.success('Item added to cart successfully.', 'Success!')
      //   this.router.navigate(['/products/list'])
    }).catch(error => {
      this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!')
      this.router.navigate(['/products'])
    })
    // return this.httpClient.post(baseUrl + userId + '/cart/'+ productId + '.json', body)
  }

  getMyCart() {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.get(`${baseUrl}${userId}/cart.json`).pipe(map((res: Response) => {
      // console.log(res)
      const cartProducts: ProductInCartModel[] = []
      if (res === null) {
        // cart is empty
        return cartProducts
      }
      const cartKeys = Object.keys(res)
      for (const itemKey of cartKeys) {
        let item = res[itemKey]
        // console.log(item)
        cartProducts.push(new ProductInCartModel(itemKey, item.name, item.imagePath, item.description, item.price, item.createdOn, item.ownerId, item.ownerName))
      }
      return cartProducts
    }))
  }

  removeProductFromCart(productIdToRemove: string) {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.delete(baseUrl + userId + '/cart/' + productIdToRemove + '/.json')
  }

  getCurrLoggedInUser() {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.get(`${baseUrl}${userId}/.json`)
  }
}