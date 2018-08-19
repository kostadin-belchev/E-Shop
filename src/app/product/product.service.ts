import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductListItemModel } from './models/product-list-item.model';
import { ProductCreateModel } from './models/product-create.model';

const baseUrl = 'https://ng-e-shop.firebaseio.com/products/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) {  }
  
  getAllStartUpProducts() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const ids = Object.keys(res)
        const products: ProductListItemModel[] = []
        for (const i of ids) {
          products.push(new ProductListItemModel(i, res[i].name, res[i].imagePath, res[i].description, res[i].price))
        }
        return products
    }))
  }

  getAllProducts() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const ids = Object.keys(res)
        const products: ProductListItemModel[] = []
        for (const i of ids) {
          products.push(new ProductListItemModel(i, res[i].name, res[i].imagePath, res[i].description, res[i].price))
        }
        return products
    }))
  }

  createRecipe(body: ProductCreateModel) {
    return this.httpClient.post(baseUrl + '.json', body)
  }

  getById(productId: string) {
    return this.httpClient.get<ProductListItemModel>(baseUrl + productId + '/.json')
  }

  editProduct(body) {
    return this.httpClient.patch(baseUrl + '.json', body)
  }

  deleteProductById(productId: string) {
    return this.httpClient.delete(baseUrl + productId + '/.json')
  }
}