import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { ProductInCartModel } from '../services/models/product-in-cart.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  carts$: Observable<[ProductInCartModel[]]>

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.carts$ = this.userService.getAllCarts()
  }

}
