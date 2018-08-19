import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { ProductListItemModel } from '../models/product-list-item.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<ProductListItemModel>
  productId: string

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id']
    this.product$ = this.productService.getById(this.productId)
  }

  deleteProduct(productIdToDelete: string) {
    // console.log('TODO delete')
    this.productService.deleteProductById(productIdToDelete).subscribe(() => {
      // console.log(data)
      this.toastrService.success('Item deleted successfully.', 'Success!')
      this.router.navigate(['/products/list'])
    }, err => {
      this.toastrService.error(err.message, 'Warning!')
    })
  }

}
