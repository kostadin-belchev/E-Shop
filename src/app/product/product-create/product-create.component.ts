import { Component, OnInit } from '@angular/core';
import { ProductCreateModel } from '../models/product-create.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  model: ProductCreateModel

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService
  ) {
    this.model = new ProductCreateModel('', '', '', undefined)
  }

  ngOnInit() {
  }

  createProduct() {
    this.model.price = Number(this.model.price.toFixed(2))
    this.productService.createRecipe(this.model).subscribe(() => {
      this.toastrService.success('Product added successfully', 'Success!')
      this.router.navigate(['/products/list'])
    })
  }

}
