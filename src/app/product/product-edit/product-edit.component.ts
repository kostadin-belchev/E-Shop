import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ProductCreateModel } from '../models/product-create.model';
import { ProductService } from '../product.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  bindingModel: ProductCreateModel
  id: string

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.productService.getById(this.id).subscribe(productToEdit => {
      // console.log('productToEdit: ')
      // console.log(productToEdit)
      this.bindingModel = productToEdit
    })
  }

  edit() {
    this.bindingModel.price = Number(this.bindingModel.price.toFixed(2))
    const body = { [this.id]: this.bindingModel };
    this.productService.editProduct(body).subscribe(() => {
      this.toastrService.success('Product edited successfully.', 'Success!')
      this.router.navigate(['/prodcuts/list'])
    })
  }
}
